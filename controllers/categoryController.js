const catchAsync = require('../utils/catchAsync');
const Category = require('../models/categoryModel');

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    status: 'success',
    data: category,
  });
});
