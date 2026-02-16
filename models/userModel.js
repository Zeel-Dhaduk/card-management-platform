const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name of user'],
  },
  email: {
    type: String,
    required: [true, 'User should have an email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
});

const User = mongoose.Schema('User', userSchema);

module.exports = User;
