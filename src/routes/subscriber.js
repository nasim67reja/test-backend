const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/Subscriber');

//  get and delete subscribers
router
  .route('/')
  .get(subscriberController.getAllSubscribers)
  .post(subscriberController.createSubscriber);

// // Delete one subscriber
router.delete('/:id', subscriberController.deletetSubscriber);

module.exports = router;
