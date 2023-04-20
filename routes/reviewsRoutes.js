const express = require('express');
const router = express.Router();
const {
  protect,
  restrictTo,
} = require('./../controllers/authenticationController');
const {
  postReview,
  getAllReviews,
} = require('../controllers/reviewsController');

router.route('/').get(getAllReviews).post(restrictTo('user'), postReview);

module.exports = router;
