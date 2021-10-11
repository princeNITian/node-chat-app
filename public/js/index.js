var socket = io();
socket.on('connect', () => {
    console.log('Connected to server!')
    socket.emit('createEmail',{
        'to': 'client',
        'text': 'hey how you doing?',
        'createdAt': new Date()
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server!')
})

socket.on('newEmail', function(email) {
    console.log('New email!',email);
})

