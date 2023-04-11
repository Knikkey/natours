const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const requiredMsg = (el) => `A user must have a(n) ${el}`;

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, requiredMsg('name')] },
  email: {
    type: String,
    required: [true, requiredMsg('email')],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, requiredMsg('password')],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run if password field was modified
  if (!this.isModified('password')) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  //delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
