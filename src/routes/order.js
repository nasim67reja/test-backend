const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/Order');

router.route('/').post(OrderController.createOrder);
router.route('/').put(OrderController.confirmOrder);

module.exports = router;
