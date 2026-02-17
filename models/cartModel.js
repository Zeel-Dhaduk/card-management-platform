const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.Schema('Cart', cartSchema);

module.exports = Cart;
