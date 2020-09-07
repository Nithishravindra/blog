const Review = require('../model/ReviewModel');
const factory = require('./handleFactory');

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createReview(Review);

// exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
