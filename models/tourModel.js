const mongoose = require('mongoose');

const requiredMsg = (el) => `A tour must have a(n) ${el}`;

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, requiredMsg('name')],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, requiredMsg('duration')],
  },
  maxGroupSize: {
    type: Number,
    required: [true, requiredMsg('max group size')],
  },
  difficulty: {
    type: String,
    required: [true, requiredMsg('difficulty')],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: { type: Number, required: [true, requiredMsg('price')] },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, requiredMsg('summary')],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, requiredMsg('cover image')],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
