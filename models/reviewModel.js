const mongoose = require('mongoose');

reviewSchema = new mongoose.Schema(
  {
    review: { type: String, required: [true, 'A review needs a... review'] },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A review needs a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    tourRef: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour'],
    },
    userRef: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//middleware

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
