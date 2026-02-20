const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItem');
const catchAsync = require('../utils/catchAsync');

exports.getAllOrderItems = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  if (orders.length === 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'You have not placed any orders! Let place it today',
    });
  }
  const orderIds = orders.map((order) => order._id);

  const orderItems = await OrderItem.find({
    order: { $in: orderIds },
  }).populate('card', { title: 1, _id: 0 });

  res.status(200).json({
    status: 'success',
    result: orderItems.length,
    data: orderItems,
  });
});

exports.getOrderItems = catchAsync(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.orderId,
    user: req.user._id,
  });

  if (!order)
    return res.status(404).json({
      status: 'fail',
      message: 'You have not placed any orders! Let place it today',
    });

  const orderItems = await OrderItem.find({ order: order._id }).populate('card', {
    title: 1,
    _id: 0,
  });

  res.status(200).json({
    status: 'success',
    result: orderItems.length,
    data: orderItems,
  });
});
