const UpcomingOrder = require('../models/UpcomingOrder');
const OrderSchedule = require('../models/OrderSchedule');
const Order = require('../models/Order');
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

router.put('/:upcomingOrderId', async (req, res) => {
  try {
    const { orderConfirm } = req.body;
    let upcomingOrder = await UpcomingOrder.findById(req.params.upcomingOrderId)
      .populate('orderSchedule');
    upcomingOrder.isConfirmed = true;
    await upcomingOrder.save();
    if (orderConfirm) {
      await Order.create({
        item: upcomingOrder.orderSchedule.item,
        merchant: upcomingOrder.orderSchedule.merchant,
        quantity: upcomingOrder.orderSchedule.quantity,
      });
    }
    res.send({
      status: 200,
      message: 'Ok',
      data: null
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: error.message,
      data: null
    });
  }
})



module.exports = router;