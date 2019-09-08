const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  transports: ['websocket']
});
const redis_pub = require('redis').createClient();
const redis_sub = require('redis').createClient();

redis_sub.subscribe('core_response');

const processIntent = (intent) => {
  redis_pub.publish("user_intent", JSON.stringify(intent));
}

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chatbot_message', async function(msg){
    const getIntent = require('./model')();
    console.log('message: ' + msg);
    processIntent(getIntent(msg));
  });

  redis_sub.on('message', (channel, message) => {
    socket.emit('chatbot_response', message);
  });

});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

// front end catch event from 'chatbot_response' and send event to 'chatbot_message'
// core subscribe to 'user_intent' and publish to 'core_response'