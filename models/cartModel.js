const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Cart = mongoose.Schema('Cart', cartSchema);

module.exports = Cart;
