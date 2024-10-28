require('dotenv').config();
const chalk = require('chalk');
const { HttpError } = require('./custom-error');

/**
 * 응답 본문에서 유효한 필드(값이 null 또는 undefined가 아닌 필드)의 갯수를 계산하는 함수
 * @param {object|array} body - 응답 본문
 * @returns {number} 유효한 필드의 총 갯수
 */
const getValidFieldCount = (body) => {
    if (body && typeof body === 'object') {
        if (Array.isArray(body)) {
            // 배열인 경우 모든 객체의 유효 필드 합산
            return body.reduce((count, item) => {
                if (item && typeof item === 'object') {
                    return count + Object.values(item).filter(val => val !== null && val !== undefined).length;
                }
                return count;
            }, 0);
        } else {
            // 단일 객체인 경우 유효 필드 갯수
            return Object.values(body).filter(val => val !== null && val !== undefined).length;
        }
    }
    return 0;
};

/**
 * 에러 스택을 포맷팅하는 함수
 * @param {string} stack - 에러 스택 문자열
 * @returns {string} 포맷팅된 에러 스택
 */
const formatErrorStack = (stack) => {
    const stackLines = stack.split('\n');
    if (stackLines.length === 0) return '';

    const firstLine = chalk.red(stackLines[1]);
    const remainingLines = chalk.gray(stackLines.slice(2).map(line => line).join('\n'));
    return `${firstLine}\n${remainingLines}`;
};

/**
 * 로그를 출력하는 함수
 * @param {any} data - 에러 객체, 요청 객체, 응답 객체 또는 일반 메시지
 * @param {string} [mode] - 로그 출력 모드 ('detailed' 또는 기본)
 */
const log = (data, mode = 'default') => {
    const { NODE_ENV, ENABLE_LOGGING } = process.env;
    const timestamp = new Date().toISOString();

    if (!ENABLE_LOGGING && NODE_ENV !== 'development') {
        return; // 로깅이 비활성화된 경우 아무것도 하지 않음
    }

    // 에러 객체인 경우
    if (data instanceof Error) {
        const errorMessage = data.message;
        const formattedStack = formatErrorStack(data.stack || '');

        const statusCode = data instanceof HttpError ? chalk.red(` (Code: ${data.statusCode})`) : '';

        if (NODE_ENV === 'development') {
            console.error(
                `${chalk.red('[에러]')}${statusCode}${chalk.red(`: ${errorMessage}`)}${chalk.gray(` - ${timestamp}`)}
${formattedStack}`
            );
        } else {
            console.error(`${chalk.red('[에러]')} - ${chalk.gray(`${timestamp}: ${errorMessage}`)}`);
        }

        console.error(data.errors)
    }
    // 응답 객체인 경우
    else if (data && typeof data.statusCode === 'number') {
        const { statusCode, body, contentType } = data;
        let logMessage = '';

        // 상태 코드가 400~599인 경우 에러로 간주
        if (statusCode >= 400 && statusCode < 600) {
            const errorMessage = `HTTP ${statusCode}`;
            if (NODE_ENV === 'development') {
                let formattedBody = '(empty)';
                if (body) {
                    try {
                        if (
                            typeof body === 'string' &&
                            contentType.includes('application/json')
                        ) {
                            formattedBody = JSON.stringify(JSON.parse(body), null, 2);
                        } else if (typeof body === 'object') {
                            formattedBody = JSON.stringify(body, null, 2);
                        } else {
                            formattedBody = body.toString();
                        }
                    } catch (err) {
                        formattedBody = '[Unable to stringify body]';
                    }
                }

                logMessage = `${chalk.red('[응답 에러]')} ${chalk.red(statusCode)}: ${chalk.red(errorMessage)}
${chalk.gray('[내용]')} ${formattedBody} - ${chalk.gray(timestamp)}`;
            } else {
                logMessage = `${chalk.red('[응답 에러]')} ${chalk.red(statusCode)} - ${chalk.gray(timestamp)}`;
            }

            console.error(logMessage);
        }
        // 정상 응답인 경우
        else {
            if (mode === 'detailed') {
                // 상세 모드: 전체 응답 데이터 파싱
                let formattedBody = '(empty)';

                if (body) {
                    try {
                        if (
                            typeof body === 'string' &&
                            contentType.includes('application/json')
                        ) {
                            // JSON 문자열인 경우 예쁘게 포맷
                            formattedBody = JSON.stringify(JSON.parse(body), null, 2);
                        } else if (typeof body === 'object') {
                            // 객체인 경우 예쁘게 포맷
                            formattedBody = JSON.stringify(body, null, 2);
                        } else {
                            // 그 외의 경우 문자열로 변환
                            formattedBody = body.toString();
                        }
                    } catch (err) {
                        formattedBody = '[Unable to stringify body]';
                    }
                }

                const validFieldCount = getValidFieldCount(body);

                logMessage = `${chalk.green('[응답]')} ${chalk.green(statusCode)}
${chalk.gray('[내용]')} ${formattedBody} - ${chalk.gray(timestamp)}`;

                console.log(logMessage);
            } else {
                console.log(body);
                const fieldCount = body ? Object.keys(body).length : 0;
                const validFieldCount = getValidFieldCount(body);
                logMessage = `${chalk.green('[응답]')} ${chalk.green(statusCode)} - ` +
                             `필드 갯수: ${chalk.blue(fieldCount)}, 유효 필드 갯수: ${chalk.blue(validFieldCount)} - ${chalk.gray(timestamp)}`;

                console.log(logMessage);
            }
        }
    }
  // 요청 객체인 경우
  else if (data && data.method && data.originalUrl) {
    const { method, originalUrl, params, query, body, headers } = data;

    let logMessage = `${chalk.blue('[요청]')} ${method} ${originalUrl}`;

    if (params && Object.keys(params).length > 0) {
        logMessage += `\n${chalk.blue('[파라미터]')} ${JSON.stringify(params, null, 2)}`;
    }

    if (query && Object.keys(query).length > 0) {
        logMessage += `\n${chalk.blue('[쿼리]')} ${JSON.stringify(query, null, 2)}`;
    }

    if (body && Object.keys(body).length > 0) {
        logMessage += `\n${chalk.blue('[본문]')} ${JSON.stringify(body, null, 2)}`;
    }

    if (headers && headers.Authorization) {
        logMessage += `\n${chalk.blue('[토큰]')} ${headers.Authorization}`;
    }

    console.log(`${logMessage} - ${chalk.gray(timestamp)}`);
  }
    // 일반 메시지인 경우
    else if (typeof data === 'string') {
        console.log(`${chalk.blue('[정보]')} - ${chalk.gray(`${timestamp}: ${data}`)}`);
    }
    // 기타 타입인 경우
    else {
        console.log(`${chalk.blue('[정보]')} - ${chalk.gray(`${timestamp}: ${JSON.stringify(data, null, 2)}`)}`);
    }
};

/**
 * 응답 객체를 로깅하기 위한 함수
 * @param {object} res - Express 응답 객체
 * @param {string} mode - 로깅 모드 ('detailed' 또는 기본)
 */
const logResponse = (res, mode = 'default') => {
    if (!res || !res.send || !res.json) {
        console.error(chalk.red('[로깅 에러] res 객체가 유효하지 않습니다.'));
        return;
    }

    // 원본 res.send 및 res.json 메서드 저장
    const originalSend = res.send.bind(res);
    const originalJson = res.json.bind(res);

    let responseBody;

    res.send = function (body) {
        responseBody = body;
        return originalSend(body);
    };

    res.json = function (body) {
        responseBody = body;
        return originalJson(body);
    };

    // 응답이 완료된 후 로깅 수행
    res.on('finish', () => {
        log({
            statusCode: res.statusCode,
            body: responseBody,
            contentType: res.get('Content-Type') || ''
        }, mode);
    });
};

module.exports = { log, logResponse };
