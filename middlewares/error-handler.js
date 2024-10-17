const { HttpError, ValidationError } = require('../utils/custom-error');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    const response = {
      message: err.message,
    };

    // ValidationError의 경우 errors 배열을 포함
    if (err instanceof ValidationError) {
      response.errors = err.errors;
    }

    return res.status(err.statusCode).json(response);
  } else {
    console.error(err); // 에러를 콘솔에 출력
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = errorHandler;