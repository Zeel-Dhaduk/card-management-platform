const Review = require('../models/reviewModel');
const OrderItem = require('../models/orderItem');
const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.setCardandUserId = (req, res, next) => {
  if (!req.body.card) req.body.card = req.params.cardId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find();

  if (reviews.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'No reviews found',
    });
  }

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: reviews,
  });
});

exports.getReview = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: 'No reviews found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.createReview = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  const orderIds = orders.map((order) => order._id);

  const items = await OrderItem.find({
    order: { $in: orderIds },
    card: req.body.card,
  });
  if (items.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'You have not bought this product first buy it then add review',
    });
  }
  const review = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: review,
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  console.log(review);
  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: 'No review found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: review,
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return res.status(404).json({
      status: 'fail',
      message: 'No review found',
    });
  }

  res.status(204).json({
    status: 'success',
  });
});
