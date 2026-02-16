const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Add product description'],
  },
  price: {
    type: Number,
    required: [true, 'Card should have price'],
  },
  stockQty: {
    type: Number,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  stauts: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
});

const Card = mongoose.Schema('Card', cardSchema);

module.exports = Card;
