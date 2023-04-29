const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const verify = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) token = req.cookies.jwt;
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Access Denied ⁣⁣🔴'), 401);
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await Admin.findById(decoded._id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  req.user = user;
  return next();
});

module.exports = {
  verify,
};
