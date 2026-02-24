const mongoose = require('mongoose');

const orderItem = new mongoose.Schema({
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order',
    required: true,
  },
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
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

orderItem.index({ card: 1 });
orderItem.index({ vendor: 1 });

const OrderItem = mongoose.model('OrderItem', orderItem);

module.exports = OrderItem;
