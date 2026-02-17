const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order should belong to an user'],
  },
  totalAmount: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['Pending', 'Placed', 'Canceled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItems',
    },
  ],
});

const Order = mongoose.Schema('Order', orderSchema);

module.exports = Order;
