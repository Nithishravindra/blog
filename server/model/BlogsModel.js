const mongoose = require('mongoose');
const validator = require('validator');

const blogSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: [true, 'Please tell us your name']
    },
    title: {
      type: String,
      required: [true, 'Please provide title']
    },
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: {
      type: String,
      required: [true, 'Please provide image']
    },
    text: {
      type: String,
      required: [true, 'Please provide text']
    },
    averageRating: {
      type: Number,
      default: 1
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.index({ authorName: 'text', title: 'text' });

blogSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'blog',
  localField: '_id'
});

const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;
