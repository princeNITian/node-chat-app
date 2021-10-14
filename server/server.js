const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage,generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000;

const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    // socket.emit from Admin text Welcome to chat App
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app!'));

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User joined!'));

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

