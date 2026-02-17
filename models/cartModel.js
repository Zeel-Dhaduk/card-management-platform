const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
  },
  Items: {
    type: [
      {
        cart: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Card',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    default: [],
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.Schema('Cart', cartSchema);

module.exports = Cart;
