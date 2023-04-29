const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  promoCode: {
    type: String,
    required: true,
    unique: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'amount'],
    // default: 'percentage',
  },
  percentageOff: {
    type: Number,
    min: 0,
    max: 100,
  },
  amountOff: {
    type: Number,
    min: 0,
  },
  minimumPurchaseAmount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;

// const [singleProduct] = Products.data.filter(
//   (el) =>
//     el.name.toUpperCase() ===
//     replaceHyphenWithWhitespace(product).toUpperCase()
// );
