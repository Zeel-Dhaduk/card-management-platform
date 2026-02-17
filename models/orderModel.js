const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order should belong to an user'],
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'placed', 'canceled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
