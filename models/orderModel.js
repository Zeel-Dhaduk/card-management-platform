const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
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
});

const Order = mongoose.Schema('Order', orderSchema);

module.exports = Order;
