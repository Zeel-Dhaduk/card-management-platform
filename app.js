const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const cardRouter = require('./routes/cardRoute');
const categoryRouter = require('./routes/categoryRoute');
const cartRouter = require('./routes/cartRoute');
const cartItemRouter = require('./routes/cartItemRoute');

const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong',
  });
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/categories', categoryRouter);
app.use('/cart', cartRouter);
app.use('/gotocart', cartItemRouter);

module.exports = app;
