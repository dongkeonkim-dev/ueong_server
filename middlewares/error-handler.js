const { log } = require('../utils/log');

const errorHandler = (err, req, res, next) => {
  log(err); // Log the error using your custom log function

  const statusCode = err.statusCode || 500;
  const response = {
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
  };
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
