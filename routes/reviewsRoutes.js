const express = require('express');
const router = express.Router();
const {
  postReview,
  getAllReviews,
} = require('../controllers/reviewsController');

router.route('/post-review').post(postReview);
router.route('/:id').get(getAllReviews);

module.exports = router;
