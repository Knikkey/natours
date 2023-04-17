const User = require('./../models/userModel');
const Tour = require('./../models/tourModel');
const Review = require('./../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.postReview = catchAsync(async function (req, res, next) {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = catchAsync(async function (req, res, next) {
  const allReviews = await Review.find();
  console.log(req.params);

  const tourReviews = allReviews.map((review) => {
    if (review.tourRef.toString() === req.params.id) return review;
  });

  res.status(201).json({
    status: 'success',
    length: tourReviews.length,
    data: {
      reviews: tourReviews,
    },
  });
});
