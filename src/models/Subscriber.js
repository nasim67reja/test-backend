const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A subscriber must have a email'],
    unique: true,
  },

  dateSubscribed: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
