// middlewares/response-logger.js

const log = require('../utils/log'); // 실제 로그 유틸리티 경로로 수정하세요

/**
 * 응답 로깅 미들웨어
 * 모든 HTTP 응답을 로깅하며, 옵션에 따라 응답 본문도 로그에 포함할 수 있습니다.
 */
const responseLogger = (req, res, next) => {
    // 환경 변수에서 로깅 설정 가져오기
    const ENABLE_RESPONSE_LOGGING =
        process.env.ENABLE_LOGGING === 'true' &&
        process.env.ENABLE_RESPONSE_LOGGING === 'true';
    const ENABLE_RESPONSE_BODY_LOGGING =
        process.env.ENABLE_RESPONSE_BODY_LOGGING === 'true';

    // 로깅이 비활성화된 경우, 미들웨어를 건너뜁니다.
    if (!ENABLE_RESPONSE_LOGGING) {
        return next();
    }

    // 원본 res.send 및 res.json 메서드 저장
    const originalSend = res.send.bind(res);
    const originalJson = res.json.bind(res);

    /**
     * 응답 본문을 로그에 기록하는 함수
     * @param {any} body - 응답 본문
     */
    const logResponse = (body) => {
        log(`[응답] ${res.statusCode}`, '정보');

        if (ENABLE_RESPONSE_BODY_LOGGING) {
            let responseBody = '(empty)';

            if (body) {
                try {
                    if (
                        typeof body === 'string' &&
                        res.get('Content-Type')?.includes('application/json')
                    ) {
                        // JSON 문자열인 경우 예쁘게 포맷
                        responseBody = JSON.stringify(JSON.parse(body), null, 2);
                    } else if (typeof body === 'object') {
                        // 객체인 경우 예쁘게 포맷
                        responseBody = JSON.stringify(body, null, 2);
                    } else {
                        // 그 외의 경우 문자열로 변환
                        responseBody = body.toString();
                    }
                } catch (err) {
                    responseBody = '[Unable to stringify body]';
                }
            }

            log(`[내용]: ${responseBody}`, '정보');
        }
    };

    /**
     * res.send 메서드를 재정의하여 응답을 로깅합니다.
     * @param {any} body - 응답 본문
     * @returns {any} - 원본 res.send 메서드의 반환값
     */
    res.send = function (body) {
        logResponse(body);
        return originalSend(body);
    };

    /**
     * res.json 메서드를 재정의하여 응답을 로깅합니다.
     * @param {any} body - JSON 응답 본문
     * @returns {any} - 원본 res.json 메서드의 반환값
     */
    res.json = function (body) {
        logResponse(body);
        return originalJson(body);
    };

    /**
     * 응답이 완료된 후 상태 코드에 따라 추가 로그를 기록합니다.
     */
    res.on('finish', () => {
        if (res.statusCode >= 400 && res.statusCode < 500) {
            log(`[에러] ${res.statusCode}`, '에러');
            log(`[요청]: ${req.method} ${req.originalUrl}`, '정보');
        }
        // 서버 오류(5xx)는 별도로 처리하지 않습니다.
    });

    next();
};

module.exports = responseLogger;
