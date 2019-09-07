const mongoose = require('mongoose');
const { orderStatus } = require('../config');
const orderSchema = mongoose.Schema({
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  quantity: Number,
  status: {
    type: String,
    default: orderStatus.PENDING
  },
  confirmed_at: {
    type: Date,
    default: null
  },
  processed_at: {
    type: Date,
    default: null
  },
  delivered_at: {
    type: Date,
    default: null
  },
}, 
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;