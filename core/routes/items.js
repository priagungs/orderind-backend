const router = require('express').Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
  try {
    const { supplierId, description, name, quantity, price, picture, recommendationPrice } = req.body;
    const item = await Item.create({
      description, name, quantity, price, picture, recommendationPrice, supplier: supplierId
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
    const items = await Item.find({
      "name": {'$regex': search, '$options': 'i'}
    }).sort({ updatedAt: -1 }).limit(Number(limit)).skip(limit * Number(page));
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

module.exports = router;