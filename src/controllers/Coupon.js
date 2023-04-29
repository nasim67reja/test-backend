const Coupon = require('../models/Coupon');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllCoupons = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find({});
  res.status(200).json({
    status: 'success',
    total: coupons.length,
    data: coupons,
  });
});

const getCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }
  console.log(coupon);
  res.status(200).json({
    status: 'success',
    data: coupon,
  });
});

const createCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({
    status: 'success',
    data: coupon,
  });
});

const updateCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndUpdate(req.body._id, req.body, {
    new: true, // Return the updated document
    runValidators: true, // Validate the data before updating
  });

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: coupon,
  });
});

const deleteCoupon = catchAsync(async (req, res, next) => {
  const coupon = await Coupon.findByIdAndDelete(req.body._id);

  if (!coupon) {
    return next(new AppError('No coupon found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
