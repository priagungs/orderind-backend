const UpcomingOrder = require('../models/UpcomingOrder');
const OrderSchedule = require('../models/OrderSchedule');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const { merchantId } = req.query;
    const orderSchedules = await OrderSchedule.find({
      merchant: merchantId
    });
    const upcomingOrders = await UpcomingOrder.find({
      orderSchedule: {
        $in: orderSchedules.map(o => o.id)
      },
      isConfirmed: false
    }).populate({
      path: 'orderSchedule',
      populate: {
        path: 'item',
        model: 'Item',
      },
    }).sort({'updated_at': -1});
    res.send({
      status: 200,
      message: 'Ok',
      data: upcomingOrders
    })
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