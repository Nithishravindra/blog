const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controllers/errorController');
const blogRouter = require('./routes/BlogsRoutes');
const reviewRouter = require('./routes/ReviewRoutes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
// parse application/json

app.use(cors());
// app.use(express.json());
console.log(Date.now());

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(globalErrorHandler);

module.exports = app;
