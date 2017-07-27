var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io').listen(server);
var arDrone = require('ar-drone');
var client  = arDrone.createClient({ip: "172.24.18.244"});
require('ar-drone-png-stream')(client, { port: 8000 });



app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('A user connected');

  socket.on('takeOff', function () {
    client.takeoff();
    console.log('App Takeoff');
  });
  socket.on('land', function () {
    client.land();
    console.log('App land');
  });
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
  socket.on('streamVideo', function () {
    console.log('App video');
  });
});

// .listen keeps server open
server.listen(3000, function(){
  console.log('listening on *:3000');
});
