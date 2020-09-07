const mongoose = require('mongoose');
const Blog = require('./BlogsModel');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name.']
  },
  review: {
    type: String,
    required: [true, 'Review can not be empty.']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  blog: {
    type: mongoose.Schema.ObjectId,
    ref: 'Blogs',
    required: [true, 'Review must belong to a Blog.']
  }
});

reviewSchema.statics.calAvgRatings = async function (blogId) {
  const stats = await this.aggregate([
    {
      $match: { blog: blogId }
    },
    {
      $group: {
        _id: '$blog',
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  await Blog.findByIdAndUpdate(blogId, {
    averageRating: stats[0].avgRating
  });

  console.log(stats);
};

reviewSchema.post('save', function () {
  this.constructor.calAvgRatings(this.blog);
  // Review.calAvgRatings(this.blog);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
