const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  supplier: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  description: String,
  name: String,
  quantity: Number,
  price: Number,
  picture: String,
  recommendationPrice: Number,
}, 
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;