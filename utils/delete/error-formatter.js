// utils/error-formatter.js

/**
 * 에러 응답을 일관되게 포맷팅하는 함수
 * @param {Error} err - 에러 객체
 * @returns {object} 포맷팅된 에러 응답 객체
 */
const formatErrorResponse = (err) => {
  const statusCode = err.statusCode || 500;
  const response = {
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack; // 개발 환경에서는 스택 트레이스 포함
  }

  return response;
};

module.exports = { formatErrorResponse };
