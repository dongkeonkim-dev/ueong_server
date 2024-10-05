class HttpError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status; // HTTP 상태 코드
    }
}

// 유효성 검증 함수
const validate = (condition, message, status) => {
    if (!condition) {
        throw new HttpError(message, status); // 조건이 충족되지 않으면 HttpError 던지기
    }
};

// 성공적인 응답 처리
const success = (res, data, message) => {
    res.status(200).json({
        message: message, // 성공 메시지
        ...data // 추가 데이터
    });
};

module.exports = { HttpError, validate, success };