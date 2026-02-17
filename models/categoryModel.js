const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category should have name'],
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
