const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name of user'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  phoneNo: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, 'en-IN');
      },
      message: 'Invalid phone number',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user',
  },
  profileImg: {
    type: String,
  },
});

const User = mongoose('User', userSchema);

module.exports = User;
