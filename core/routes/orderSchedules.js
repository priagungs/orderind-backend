const OrderSchedule = require('../models/OrderSchedule');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { merchantId, itemId, quantity, isMonthly, isWeekly, isEachMinute } = req.body;
    const orderSchedule = await OrderSchedule.create({
      merchant: merchantId,
      item: itemId,
      quantity, isMonthly, isWeekly, isEachMinute
    });
    res.send({
      status: 200,
      message: 'Ok',
      data: orderSchedule,
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