const express = require("express");
const reviewController = require("../controllers/reviewController");
const router = express.Router({ mergeParams: true });

router.route("/").get(reviewController.getAllReviews);

router
  .route("/:id")
  .post(reviewController.createReview)
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview);

module.exports = router;
