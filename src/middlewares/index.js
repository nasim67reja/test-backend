const logger = require('../utils/logger');
const AppError = require('../utils/appError');

const processRequest = async (req, res, next) => {
  let correlationId = req.headers['x-correlation-id'];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers['x-correlation-id'] = correlationId;
  }
  res.set('x-correlation-id', correlationId);

  return next();
};

const notFound = (req, res, next) => {
  const error = new AppError();
  error.statusCode = 404;
  error.message = `Can't find ${req.originalUrl} on this server!, 404`;
  next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  const correlationId = req.headers['x-correlation-id'];
  const requestBody = req.body;

  let statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  let { message } = err;
  console.log(err);

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    const value = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/)[0];
    message = `Duplicate field value: ${value}. Please use another value!`;
  } else if (err.name === 'MongoServerError') {
    const e = err.stack.split(':');
    message = `${e[1]}`;
  } else if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    message = `Invalid input data. ${errors.join('. ')}`;
    statusCode = 400;
  } else if (err.name === 'SyntaxError') {
    message = `Invalid api request. ${err.message}`;
    statusCode = 400;
  } else if (err.name === 'JsonWebTokenError') {
    message = `Invalid token. Please log in again!`;
    statusCode = 401;
  } else if (err.name === 'TokenExpiredError') {
    message = `Your token has expired!. Please log in again!`;
    statusCode = 401;
  } else if (err.name === 'ReferenceError') {
    statusCode = 500;
  }

  res.status(statusCode).json({
    state: status,
    message,
    stack: err.stack,
  });

  logger.error(
    `${statusCode} - ${status} - ${req.originalUrl} - ${req.method} - ${req.ip} - ${correlationId} - ${err.message} - ${err.stack} `
  );
};

module.exports = {
  processRequest,
  notFound,
  errorHandler,
};
