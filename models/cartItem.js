const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'card',
    required: [true, 'cartItem should belong to a card'],
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cart',
    required: [true, 'cartItem should belong to a cart'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = Order;
