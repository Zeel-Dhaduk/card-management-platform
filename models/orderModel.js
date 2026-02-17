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
  Items: {
    type: [
      {
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
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.Schema('Order', orderSchema);

module.exports = Order;
