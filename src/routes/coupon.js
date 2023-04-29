// Require the necessary modules
const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/Coupon');
const { verify } = require('../middlewares/auth');

// router.use(verify);
router.get('/all', CouponController.getAllCoupons);

router
  .route('/')
  .get(CouponController.getCoupon)
  .post(CouponController.createCoupon)
  .put(CouponController.updateCoupon)
  .delete(CouponController.deleteCoupon);

// Export the router object
module.exports = router;
