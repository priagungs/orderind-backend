const mongoose = require('mongoose');

const orderScheduleSchema = mongoose.Schema({
  merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  quantity: Number,
  isMonthly: Boolean,
  isWeekly: Boolean,
  isEachMinute: Boolean,
  lastOrderCreated: {
    type: Date,
    default: null,
  },
},
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const OrderSchedule = mongoose.model('OrderSchedule', orderScheduleSchema);

module.exports = OrderSchedule;