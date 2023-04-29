const express = require('express');
const router = express.Router();
require('dotenv').config();
const publishKey = process.env.STRIPE_PUBLISHABLE_KEY_TEST;
const secretKey = process.env.STRIPE_SECRET_KEY_TEST;

router.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    publishKey,
    secretKey,
  });
});
module.exports = router;
