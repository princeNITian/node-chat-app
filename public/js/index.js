var socket = io();
socket.on('connect', () => {
    console.log('Connected to server!')
    // socket.emit('createMessage',{
    //     'from': 'Andrew',
    //     'text': 'hey how you doing?',
    // });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server!')
})

socket.on('newMessage', function(message) {
    console.log('newMessage',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
})

// socket.emit('createMessage',{
//     from: 'John',
//     text: 'hi ',
// }, function(data) {
//     console.log('Got it!',data)
// })

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    })
})
