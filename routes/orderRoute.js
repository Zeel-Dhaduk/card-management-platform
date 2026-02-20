const express = require('express');
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').post(authController.protect, orderController.checkOut);

module.exports = router;
