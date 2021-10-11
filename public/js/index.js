var socket = io();
socket.on('connect', () => {
    console.log('Connected to server!')
    socket.emit('createMessage',{
        'from': 'Andrew',
        'text': 'hey how you doing?',
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    console.log('newMessage',message);
})

