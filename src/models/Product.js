const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeVariantSchema = new Schema({
  size: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128 },
  quantity: { type: Number, required: true },
});

const colorVariantSchema = new Schema({
  color: { type: String, required: true },
  sku: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128 },
  quantity: { type: Number, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  sku: { type: String, required: true, unique: true, index: true },
  imageUrls: [{ type: String, required: true }],
  colorVariant: [colorVariantSchema],
  sizeVariant: [sizeVariantSchema],
  type: {
    type: String,
    enum: ['customized', 'regular'],
    required: true,
  },
  discountPercent: { type: Number, min: 0, max: 100, default: null },
  discountAmount: { type: Number, default: null },
  slug: { type: String, required: true, unique: true, index: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
