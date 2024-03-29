const router = require('express').Router();
const Item = require('../models/Item');
const UpcomingOrder = require('../models/UpcomingOrder');
const OrderSchedule = require('../models/OrderSchedule');

router.post('/', async (req, res) => {
  try {
    const { supplierId, description, name, quantity, price, picture, recommendationPrice } = req.body;
    const item = await Item.create({
      description, name, quantity, price, picture, recomendationPrice: recommendationPrice || price, supplier: supplierId
    });
    res.send({
      status: 200,
      message: "Ok",
      data: item
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.put('/:itemId', async (req, res) => {
  try {
    let item = await Item.findById(req.params.itemId);
    const { description, name, quantity, price, picture, recommendationPrice } = req.body;
    item.description = description || item.description
    item.name = name || item.name
    item.quantity = quantity || item.quantity
    item.price = price || item.price
    item.picture = picture || item.picture
    item.recommendationPrice = recommendationPrice || item.recommendationPrice
    item = await item.save();
    res.send({
      status: 200,
      message: "Ok",
      data: item
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const page = req.query.page || 0;
    const limit = req.query.limit || 10;
    const supplierId = req.query.merchantId;
    let items;
    if (supplierId) {
      items = await Item.find({
        "name": {'$regex': search, '$options': 'i'},
        supplier: supplierId
      }).sort({ updated_at: -1 }).limit(Number(limit)).skip(limit * Number(page));
    } else {
      items = await Item.find({
        "name": {'$regex': search, '$options': 'i'},
      }).sort({ updated_at: -1 }).limit(Number(limit)).skip(limit * Number(page));
    }
    console.log(items);
    res.send({
      status: 200,
      message: 'Ok',
      data: items
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId).populate('supplier');
    res.send({
      status: 200,
      message: 'Ok',
      data: item
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

router.delete('/:itemId', async (req, res) => {
  try {
    const orderSchedules = await OrderSchedule.find({
      item: req.params.itemId
    });
    orderSchedules.forEach(async (orderSchedule) => {
      const upcomingOrders = await UpcomingOrder.find({
        orderSchedule: orderSchedules.id
      });
      upcomingOrders.forEach(upcomingOrder => UpcomingOrder.findOneAndDelete(upcomingOrder.id));
      OrderSchedule.findByIdAndRemove(orderSchedule.id);
    });
    await Item.findByIdAndDelete(req.params.itemId);

    res.send({
      status: 200,
      message: 'Ok',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: error.message,
      data: null
    });
  }
});

module.exports = router;