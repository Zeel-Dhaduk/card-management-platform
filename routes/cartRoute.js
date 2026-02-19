const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/add', authController.protect, cartController.addToCart);

module.exports = router;
