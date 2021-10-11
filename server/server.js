const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);

const publicPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000;

const io = socketIO(server);

app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('New user connected!')

    // socket.emit('newMessage',{
    //     'from': 'server',
    //     'text': 'hey how you doing?',
    //     'createdAt': new Date()
    // });

    socket.on('createMessage',function(message){
        console.log('createMessage', message);

        // server emits message to all clients through io
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
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

