const Blog = require('../model/BlogsModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/catchAsync');

exports.getAllBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog);
// exports.updateReview = factory.updateOne(Review);
exports.deleteBlog = factory.deleteOne(Blog);

exports.getMaxRatingBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.aggregate([
    {
      $sort: { averageRating: -1 }
    },
    {
      $limit: 5
    }
  ]);
  // console.log(blog);
  if (!blog) {
    return next(new AppError('No blogs found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: blog.length,
    data: {
      blog
    }
  });
});

exports.searchBlogs = catchAsync(async (req, res, next) => {
  console.log('Hello');
  console.log(req.params);

  const blog = Blog.find({ $authorName: { $search: req.params.$authorName } });

  console.log(blog);

  if (!blog) return next(new AppError('No Blogs found', 404));

  res.status(200).json({
    status: 'success',
    data: {
      blog
    }
  });
});
