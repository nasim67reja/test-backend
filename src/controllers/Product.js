const Slugify = require('slugify');
const Product = require('../models/Product');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const makeSKU = length => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});
  res.status(200).send({
    status: 'success',
    total: products.length,
    data: products,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const slug = Slugify(req.body.name, {
    lower: true,
    strict: true,
    replacement: '-',
  });

  const sku = makeSKU(5);

  req.body.slug = slug;
  req.body.sku = sku;

  const newProduct = new Product(req.body);

  const product = await newProduct.save();
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError(`Product Id: ${req.params.id} not found`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: product,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  console.log('data', req.body);
  console.log('hit this route');
  const slug = Slugify(req.body.name, {
    lower: true,
    strict: true,
    replacement: '-',
  });

  req.body.slug = slug;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError(`Product Id: ${req.params.id} not found`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.body._id);

  if (!product) {
    return next(new AppError(`Product Id: ${req.body._id} not found`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
