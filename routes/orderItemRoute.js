const express = require('express');
const orderItemController = require('../controllers/orderItemController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/').get(authController.protect, orderItemController.getAllOrderItems);
router.get('/:orderId/items', authController.protect, orderItemController.getOrderItems);
module.exports = router;
