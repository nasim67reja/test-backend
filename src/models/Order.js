const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  paymentId: { type: String },
  sessionId: { type: String },
  paymentStatus: { type: String, required: true },
  deliveryStatus: { type: Boolean, default: false },
  currency: { type: String, required: true },
  customerName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  totalCost: { type: Number, required: true },
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      sku: { type: String },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discount: { type: Number, required: true },
      total: { type: Number, required: true },
      design: { type: String, default: null },
    },
  ],
  address: {
    street1: { type: String, required: true, trim: true },
    street2: { type: String, trim: true, default: '' },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    zip: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
  },
  coupon: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
