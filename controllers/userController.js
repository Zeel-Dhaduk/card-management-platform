const catchAsync = require('../utils/catchAsync');
const OrderItem = require('../models/orderItem');

exports.getCardStats = catchAsync(async (req, res) => {
  const stats = await OrderItem.aggregate([
    {
      $match: { vendor: req.user._id },
    },
    {
      $group: {
        _id: '$card',
        totalSold: { $sum: '$quantity' },
      },
    },
    { $sort: { totalSold: -1 } },
  ]);

  res.status(200).json({
    status: 'success',
    result: stats.length,
    data: stats,
  });
});
