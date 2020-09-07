const mongoose = require('mongoose');

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

reviewSchema.statics.calAvgRatings = async function (blogID) {
  const stats = await this.aggregate([
    {
      $match: { blog: blodID }
    },
    {
      $group: {
        _id: '$blog',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  console.log(stats);
};

reviewSchema.pre('save', function (next) {
  this.constructor.calAvgRatings(this.blog);

  // Review.calAvgRatings(this.blog);

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
