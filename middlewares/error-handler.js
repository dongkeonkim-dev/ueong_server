// const { HttpError, ValidationError } = require('../utils/custom-error');
// const log = require('../utils/log');

// const errorHandler = (err, req, res, next) => {
//   if (err instanceof HttpError) {
//     const response = {
//       message: err.message,
//     };

//     if (err instanceof ValidationError) {
//       response.errors = err.errors;
//     }

//     if (process.env.NODE_ENV === 'development') {
//       response.stack = err.stack; // 개발 환경에서만 스택 정보 추가
//     }

//     return res.status(err.statusCode).json(response);
//   } else {
//     log(err, '에러'); // log 함수를 사용하여 에러를 출력
//     res.status(500).json({ 
//       message: 'Internal Server Error',
//       stack: err.stack // 스택 정보 추가
//     });
//   }
// };

// module.exports = errorHandler;
// middlewares/error-handler.js
const log = require('../utils/log');

const errorHandler = (err, req, res, next) => {
  log(err, '에러'); // Log the error using your custom log function

  const statusCode = err.statusCode || 500;
  const response = {
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
  };

  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack; // Include stack trace in development
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;