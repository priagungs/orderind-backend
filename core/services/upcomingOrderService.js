const { scheduleJob } = require('node-schedule');
const OrderSchedule = require('../models/OrderSchedule');
const UpcomingOrder = require('../models/UpcomingOrder');
const moment = require('moment');

module.exports = () => {
  let scheduledJob;
  const invoke = () => {
    scheduledJob = scheduleJob('*/1 * * * *', schedulerCallback);
  };

  const revoke = () => {
    scheduledJob.cancel();
  }

  const schedulerCallback = async () => {
    try {
      const currentTime = new Date();
      let orderSchedules = await OrderSchedule.find({
        $or: [
          {
            lastOrderCreated: {
              $lte: currentTime
            }
          },
          {
            lastOrderCreated: null
          },
        ],
      });
      orderSchedules.forEach(async orderSchedule => {
        const momentLastSent = orderSchedules.lastOrderCreated 
          ? moment(orderSchedule.lastOrderCreated) 
          : moment(orderSchedule.created_at);
        if (orderSchedule.isMonthly && moment(currentTime).diff(momentLastSent, 'months')) {
          orderSchedule.lastOrderCreated = currentTime;
          await orderSchedule.save();
          await createUpcomingOrder(orderSchedule.id);
        } else if (orderSchedule.isWeekly && moment(currentTime).diff(momentLastSent, 'weeks')) {
          orderSchedule.lastOrderCreated = currentTime;
          await orderSchedule.save();
          await createUpcomingOrder(orderSchedule.id);
        } else if (orderSchedule.isEachMinute && moment(currentTime).diff(momentLastSent, 'minutes')) {
          orderSchedule.lastOrderCreated = currentTime;
          await orderSchedule.save();
          await createUpcomingOrder(orderSchedule.id);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  const createUpcomingOrder = async orderScheduleId => {
    await UpcomingOrder.create({
      orderSchedule: orderScheduleId
    });
  }

  return {
    invoke, revoke
  }
}