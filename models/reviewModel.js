const mongoose = require('mongoose');
const Card = require('./cardModel');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review can not be empty!'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  card: {
    type: mongoose.Schema.ObjectId,
    ref: 'Card',
    required: [true, 'Review must belong to a card'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});

reviewSchema.index({ card: 1, user: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function (cardId) {
  const stats = await this.aggregate([
    {
      $match: { card: cardId },
    },
    {
      $group: {
        _id: 'card',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats) {
    await Card.findByIdAndUpdate(cardId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Card.findByIdAndUpdate(cardId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.card);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
