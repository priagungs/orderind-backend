const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const ordersRouter = require('./routes/orders');

const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/orderind'
mongoose.connect(dbUri)

const messageServices = require('./services/messageServices')();

const app = express();
const redis_pub = require('redis').createClient();
const redis_sub = require('redis').createClient();

redis_sub.subscribe('user_intent');
redis_sub.on('message', async (channel, message) => {
  redis_pub.publish('core_response', await messageServices.processMessage(message));
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);

app.listen(3000, () => {
  console.log('Running on port 3000');
})

module.exports = app;
