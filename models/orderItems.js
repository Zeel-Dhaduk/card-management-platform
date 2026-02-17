const mongoose = require('mongoose');

const orderItems = new mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card',
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'An order must contain a item'],
  },
  price: {
    type: Number,
  },
});

const OrderItems = mongoose.Schema('OrderItems', orderItems);

module.exports = OrderItems;
