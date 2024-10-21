class HttpError extends Error {
  /**
   * @param {string} message - 에러 메시지
   * @param {number} statusCode - HTTP 상태 코드
   */
  constructor(message = "에러 발생", statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends HttpError {
  /**
   * @param {Array} errors - Zod에서 발생한 에러 배열
   * @param {number} statusCode - HTTP 상태 코드
   */
  constructor(errors, statusCode = 400) {
    super("Validation Error", statusCode);
    this.errors = errors;
  }
}

module.exports = { HttpError, ValidationError };