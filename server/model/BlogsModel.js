const mongoose = require('mongoose');
const validator = require('validator');

const blogSchema = new mongoose.Schema({
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
    // data: Buffer,
    // contentType: String,
    type: String,
    required: [true, 'Please provide image']
    // default: "default.jpg",
  },
  text: {
    type: String,
    required: [true, 'Please provide text']
  },
  averageRating: {
    type: Number,
    default: 1
  }
});

const Blogs = mongoose.model('Blogs', blogSchema);

module.exports = Blogs;
