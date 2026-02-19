const express = require('express');
const cartItemController = require('../controllers/cartItemController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.route('/').get(cartItemController.getAllCartItems);

router
  .route('/:id')
  .get(cartItemController.getCartItem)
  .patch(cartItemController.updateCartItem)
  .delete(cartItemController.removeCartItem);

module.exports = router;
