const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blogsController');
const Blog = require('../model/BlogsModel');
const AppError = require('../utils/appError');
const { v4: uuidv4 } = require('uuid');
uuidv4();

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName =
      'image-' + file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new AppError('Only .png, .jpg and .jpeg format allowed', 400));
    }
  }
});

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(upload.single('photo'), async (req, res, next) => {
    console.log('hellllo');
    // console.log(req.file);

    const url = req.protocol + '://' + req.get('host');
    const reqData = JSON.parse(req.body.data) || {};

    // console.log(reqData);
    // console.log(req);

    const doc = await Blog.create({
      authorName: reqData.authorName,
      title: reqData.title,
      email: reqData.email,
      photo: url + '/public/' + req.file.filename,
      text: reqData.text
    });
    console.log(doc);
    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

router.route('/getMainBlogs').get(blogController.getMaxRatingBlog);
router.route('/searchBlogs/:authorName').post(blogController.searchBlogs);

router
  .route('/:id')
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
