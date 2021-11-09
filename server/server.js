const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const { isRealString } =  require('./utils/validation');

var app = express();
var server = http.createServer(app);

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000;

const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

  

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name are required.');
        }

        socket.join(params.room);
        // socket.leave('The Office Fans')

        // io.emit  ->  io.to('The Office Fans').emit
        // socket.broadcast.emit   ->  socket.broadcast.to('The Offince Fans').emit
        // socket.emit    ->  

          // socket.emit from Admin text Welcome to chat App
        socket.emit('newMessage',generateMessage('Admin','Welcome to chat app!'));

        // socket.broadcast.emit from Admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} joined`));
        callback()
    })

    socket.on('createMessage',function(message,callback){
        console.log('createMessage', message);

        // server emits message to all clients through io
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
    })

    socket.on('createLocationMessage', function(coords) {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude))
    })

    socket.on('disconnect', () => {
        console.log('User disconnected!')
    })
})

// app.get('/',(req,res) => {
//     res.sendFile(publicPath+'/index.html')
// })

server.listen(port,() => {
    console.log(`Listening on port ${port}`);
})

