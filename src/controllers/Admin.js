const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createAdmin = catchAsync(async (req, res, next) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const admin = await Admin.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      admin,
    },
  });
});
// const sendCookie = (res, token) => {
//   res.cookie('jwt', token, {
//     expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//   });
// };

const login = catchAsync(async (req, res, next) => {
  const { email, password, loginTypes } = req.body;
  if (!email) {
    return next(new AppError('Please provide email!', 400));
  }
  const user = await Admin.findOne({ email });
  if (!user) {
    return next(new AppError('User Not Found!', 401));
  }
  if (loginTypes === 'social') {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      token,
    });
  } else {
    if (!password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return next(new AppError('Invalid Password!', 401));
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true,
    });
    console.log(process.env.NODE_ENV);

    res.status(200).json({
      status: 'success',
      token,
    });
  }
});

const isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  console.log('req.cookies', req.cookies);

  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('Access Denied ⁣⁣🔴 from isLoggedin'), 401);
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await Admin.findById(decoded._id).select('-password');
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});

module.exports = {
  createAdmin,
  login,
  isLoggedIn,
};
