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
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be below regular price',
    },
  },
  stockQty: {
    type: Number,
    required: true,
    default: 0,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  imageCover: {
    type: String,
  },
  images: [String],
  slug: String,
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  ratings: {
    type: Number,
    default: 4.5,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be greater than 1'],
    max: [5, 'Rating must be less than 5'],
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
