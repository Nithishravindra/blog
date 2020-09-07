const Blog = require("../model/BlogsModel");
const factory = require("./handleFactory");

exports.getAllBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog);

// exports.updateReview = factory.updateOne(Review);
exports.deleteBlog = factory.deleteOne(Blog);
