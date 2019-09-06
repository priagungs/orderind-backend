const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, index: true, unique: true},
  password: String,
  type: String, //MERCHANT or SUPPLIER
});

const User = mongoose.model('User', userSchema);

module.exports = User;