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
    super("유효성 검증 오류", statusCode);
    this.errors = errors;
  }
}

class DataNotFoundError extends HttpError {
  constructor(errors, statusCode = 404) {
    super("데이터를 찾을 수 없습니다.", statusCode);
    this.errors = errors;
  }
}

class AffectedRowsError extends HttpError {
  constructor(errors, statusCode = 404) {
    super("영향받은 행이 없습니다.", statusCode);
    this.errors = errors;
  }
}

class DuplicateError extends HttpError {
  constructor(errors, statusCode = 409) {
    super("중복된 데이터가 존재합니다.", statusCode);
    this.errors = errors;
  }
}

class UnauthorizedError extends HttpError {
  constructor(errors, message = "권한이 없습니다.", statusCode = 401) {
    super(message, statusCode);
    this.errors = errors;
  }
}

class ForbiddenError extends HttpError {
  constructor(errors, statusCode = 403) {
    super("권한이 없습니다.", statusCode);
    this.errors = errors;
  }
}

class InternalServerError extends HttpError {
  constructor(errors, statusCode = 500) {
    super("서버 오류", statusCode);
    this.errors = errors;
  }
}

class NotImplementedError extends HttpError {
  constructor(errors, statusCode = 501) {
    super("구현되지 않은 기능입니다.", statusCode);
    this.errors = errors;
  }
}

class BadGatewayError extends HttpError {
  constructor(errors, statusCode = 502) {
    super("Bad Gateway", statusCode);
    this.errors = errors;
  }
}

class ServiceUnavailableError extends HttpError {
  constructor(errors, statusCode = 503) {
    super("서비스를 사용할 수 없습니다.", statusCode);
    this.errors = errors;
  }
}

class GatewayTimeoutError extends HttpError {
  constructor(errors, statusCode = 504) {
    super("Gateway Timeout", statusCode);
    this.errors = errors;
  }
}

class HttpVersionNotSupportedError extends HttpError {
  constructor(errors, statusCode = 505) {
    super("HTTP Version Not Supported", statusCode);
    this.errors = errors;
  }
}

class VariantAlsoNegotiatesError extends HttpError {
  constructor(errors, statusCode = 506) {
    super("Variant Also Negotiates", statusCode);
    this.errors = errors;
  }
}

class InsufficientStorageError extends HttpError {
  constructor(errors, statusCode = 507) {
    super("Insufficient Storage", statusCode);
    this.errors = errors;
  }
}

class LoopDetectedError extends HttpError {
  constructor(errors, statusCode = 508) {
    super("Loop Detected", statusCode);
    this.errors = errors;
  }
}

class NotExtendedError extends HttpError {
  constructor(errors, statusCode = 510) {
    super("Not Extended", statusCode);
    this.errors = errors;
  }
}

class NetworkAuthenticationRequiredError extends HttpError {
  constructor(errors, statusCode = 511) {
    super("Network Authentication Required", statusCode);
    this.errors = errors;
  }
}

class UnknownError extends HttpError {
  constructor(errors, statusCode = 599) {
    super("알 수 없는 오류", statusCode);
    this.errors = errors;
  }
}

module.exports = {
  HttpError,
  ValidationError,
  DataNotFoundError,
  AffectedRowsError,
  DuplicateError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  NotImplementedError,
  BadGatewayError,
  ServiceUnavailableError,
  GatewayTimeoutError,
  HttpVersionNotSupportedError,
  VariantAlsoNegotiatesError,
  InsufficientStorageError,
  LoopDetectedError,
  NotExtendedError,
  NetworkAuthenticationRequiredError,
  UnknownError
};
