const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
  merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  quantity: Number,
  status: String
}, 
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;