const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const ordersRouter = require('./routes/orders');
const orderSchedulesRouter = require('./routes/orderSchedules');
const upcomingOrdersRouter = require('./routes/upcomingOrders');
const messagesRouter = require('./routes/messages');

const mongoose = require('mongoose');

const dbUri = 'mongodb://localhost:27017/orderind'
mongoose.connect(dbUri)

const Message = require('./models/Message');

const messageServices = require('./services/messageServices')();
const upcomingOrderServices = require('./services/upcomingOrderService')().invoke();

const app = express();
const redis_pub = require('redis').createClient();
const redis_sub = require('redis').createClient();

const { messageType } = require('./config');

redis_sub.subscribe('user_intent');
redis_sub.on('message', async (channel, message) => {
  try {
    message = JSON.parse(message);
    const response = await messageServices.processMessage(message, '5d726d23c392ad75ea1079ab');
    redis_pub.publish('core_response', JSON.stringify(response));
  } catch (error) {
    console.log(error)
  }
});
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);
app.use('/order-schedules', orderSchedulesRouter);
app.use('/upcoming-orders', upcomingOrdersRouter);
app.use('/messages', messagesRouter);

app.listen(3000, () => {
  console.log('Running on port 3000');
})

module.exports = app;
