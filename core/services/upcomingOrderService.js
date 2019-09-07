const { scheduleJob } = require('node-schedule');
const OrderSchedule = require('../models/OrderSchedule');
const UpcomingOrder = require('../models/UpcomingOrder');

module.exports = () => {
  let scheduledJob;
  const invoke = () => {
    scheduledJob = scheduleJob('*/1 * * * *', this.schedulerCallback);
  };

  const revoke = () => {
    scheduledJob.cancel();
  }

  const schedulerCallback = async () => {
    try {
      const currentTime = new Date();
      let orderSchedules = await OrderSchedule.find({
        lastOrderCreated: {
          $lte: currentTime
        }
      });
      orderSchedules.forEach(async orderSchedule => {
        if (orderSchedule.isMonthly && ) {

        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}