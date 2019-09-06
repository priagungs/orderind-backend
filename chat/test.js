var socket = require('socket.io-client')('http://localhost:3000');
const redis_pub = require('redis').createClient();
const redis_sub = require('redis').createClient();

redis_sub.subscribe('user_intent');

socket.emit('chatbot_message', 'mau daftar semua produk dong');
socket.on('chatbot_response', (msg) => {
  console.log(msg);
});

redis_sub.on('message', (channel, message) => {
  console.log(message);
  redis_pub.publish('core_response', 'oke ' + message);
});