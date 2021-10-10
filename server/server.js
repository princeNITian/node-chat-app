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

