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
    {
      $lookup: {
        from: 'cards',
        localField: '_id',
        foreignField: '_id',
        as: 'cardDetails',
      },
    },
    {
      $unwind: '$cardDetails',
    },
    {
      $project: {
        _id: 0,
        title: '$cardDetails.title',
        totalSold: 1,
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

exports.getMonthlyStats = catchAsync(async (req, res) => {
  const stats = await OrderItem.aggregate([
    {
      $match: { vendor: req.user._id },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: {
          $sum: { $multiply: ['$price', '$quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        revenue: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    result: stats.length,
    data: stats,
  });
});

exports.getMonthlyRevenue = catchAsync(async (req, res) => {
  const stats = await OrderItem.aggregate([
    {
      $group: {
        _id: { $month: '$createdAt' },
        revenue: {
          $sum: { $multiply: ['$price', '$quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        month: '$_id',
        revenue: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

exports.getVendorPerformance = catchAsync(async (req, res) => {
  const stats = await OrderItem.aggregate([
    {
      $group: {
        _id: '$vendor',
        total: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'vendorDetails',
      },
    },
    {
      $unwind: '$vendorDetails',
    },
    {
      $project: {
        _id: 0,
        vendor: '$vendorDetails.name',
        total: 1,
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});
