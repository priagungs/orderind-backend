const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  merchant: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  message: String,
  additionalData: Object,
}, 
{ 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;