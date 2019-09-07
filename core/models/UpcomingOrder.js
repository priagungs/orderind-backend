const mongoose = require('mongoose');

const upcomingOrderSchema = mongoose.Schema({
  orderSchedule: {type: mongoose.Schema.Types.ObjectId, ref: 'OrderSchedule'},
  isConfirmed: {
    type: Boolean,
    default: false
  }
},
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const UpcomingOrder = mongoose.model('UpcomingOrder', upcomingOrderSchema);

module.exports = UpcomingOrder;