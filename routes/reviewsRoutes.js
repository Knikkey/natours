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
  updateReview,
  setTourUserIds,
} = require('../controllers/reviewsController');

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, postReview);

router.route('/:id').delete(deleteReview).patch(updateReview);

module.exports = router;
