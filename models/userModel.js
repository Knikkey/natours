const mongoose = require('mongoose');
const validator = require('validator');

const requiredMsg = (el) => `A user must have a(n) ${el}`;

const userSchema = new mongoose.Schema({
  name: { type: string, required: [true, requiredMsg('name')] },
  email: {
    type: string,
    required: [true, requiredMsg('email')],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: string },
  password: {
    type: string,
    required: [true, requiredMsg('password')],
    minlength: 8,
  },
  passwordConfirm: {
    type: string,
    required: [true, 'Please confirm your password'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
