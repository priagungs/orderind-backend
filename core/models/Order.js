const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  quantity: Number,
  status: String,
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