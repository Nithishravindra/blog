const Blog = require('../model/BlogsModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/catchAsync');

exports.getAllBlogs = factory.getAll(Blog);
exports.getBlog = factory.getOne(Blog, 'reviews');
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
  if (blog.length == 0) {
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
  // console.log(req.params);

  let blog = await Blog.find({
    $text: { $search: req.params.searchItem }
  }).populate('reviews');

  if (!blog) return next(new AppError('No Blogs found', 404));

  res.status(200).json({
    status: 'success',
    results: blog.length,
    data: {
      blog
    }
  });
});
