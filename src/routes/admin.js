const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/Admin');

router.post('/signup', AdminController.createAdmin);
router.get('/isLoggedIn', AdminController.isLoggedIn);
router.post('/login', AdminController.login);

module.exports = router;
