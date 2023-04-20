const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  restrictTo,
  protect,
} = require('./../controllers/authenticationController');
const {
  postReview,
  getAllReviews,
  deleteReview,
} = require('../controllers/reviewsController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), postReview);

router.route('/:id').delete(deleteReview);

module.exports = router;
