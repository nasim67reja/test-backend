const Subscriber = require('../models/Subscriber');
const catchAsync = require('../utils/catchAsync');

// Get all subscribers

exports.getAllSubscribers = catchAsync(async (req, res) => {
  const subscriber = await Subscriber.find();
  res.status(200).send({
    status: 'success',
    total: subscriber.length,
    data: subscriber,
  });
});

// // Create a new subscriber
exports.createSubscriber = catchAsync(async (req, res) => {
  const subscriber = await Subscriber.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: subscriber,
    },
  });
});

// // Delete one subscriber

exports.deletetSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

  if (!subscriber) {
    return next(new AppError(`subscriber Id: ${req.params.id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});
