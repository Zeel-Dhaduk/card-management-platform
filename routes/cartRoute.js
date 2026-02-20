const express = require('express');
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, cartController.getCart);
router.post('/add', authController.protect, cartController.addToCart);

module.exports = router;
