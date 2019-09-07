const Order = require('../models/Order');
const User = require('../models/User');
const Item = require('../models/Item');
const router = require('express').Router();
const { orderStatus, userType } = require('../config');

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('merchant')
      .populate({
        path: 'item',
        populate: {
          path: 'supplier',
          model: 'User',
        },
      });
    res.send({
      status: 200,
      message: 'Ok',
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId;
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const user = await User.findById(userId)
    let orders;
    if (user.type === userType.MERCHANT) {
      orders = await Order.find({
        merchant: userId
      })
        .limit(Number(limit))
        .skip(Number(limit) * Number(page))
        .populate('item')
        .sort({ updated_at: -1 });
    } else if (user.type === userType.SUPPLIER) {
      const items = await Item.find({
        supplier: userId
      });
      orders = await Order.find({
        item: {
          $in: items.map(item => item.id)
        }
      })
      .sort({ updated_at: -1 })
      .limit(Number(limit))
      .skip(Number(limit) * Number(page))
      .populate('item');
    }
    res.send({
      status: 200,
      message: 'Ok',
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { quantity, merchantId, itemId } = req.body;
    let order = await Order.create({
      quantity, merchant: merchantId, item: itemId, status: orderStatus.PENDING, 
    });
    order = await Order.findById(order.id).populate('item').populate('merchant');
    res.send({
      status: 200,
      message: 'Ok',
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.put('/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    let order = await Order.findById(req.params.orderId);
    const dateNow = new Date();
    switch (status) {
      case orderStatus.CONFIRMED:
        order.confirmed_at = dateNow;
        let item = await Item.findById(order.item);
        item.quantity = item.quantity - order.quantity;
        await item.save();
        break;
      case orderStatus.ON_PROCESS:
        order.confirmed_at = order.confirmed_at || dateNow;
        order.processed_at = dateNow;
        break;
      case orderStatus.DELIVERED:
        order.confirmed_at = order.confirmed_at || dateNow;
        order.processed_at = order.processed_at || dateNow;
        order.delivered_at = dateNow;
        break;
      default:
        return res.status(400).send({
          status: 400,
          message: 'Wrong Order Status',
          data: null
        });
    }
    order.status = status;
    await order.save();
    res.send({
      status: 200,
      message: 'Ok',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

module.exports = router;