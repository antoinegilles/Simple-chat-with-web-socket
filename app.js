const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendfile('index.html')
})

 //color randoom
 function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
} 

io.on('connection', function(socket){
  console.log("une connexion")
 
  socket.on('pseudo', function(pseudo){
    socket.pseudo = pseudo;
    socket.color = getRandomColor();
  });

  socket.on('chat message', function(msg){
    io.emit('color',socket.color)
    io.emit('chat message', socket.pseudo + " : " +msg);
  });

});


http.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
  

