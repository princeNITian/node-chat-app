var socket = io();

function scrollBottom() {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.prop('scrollTop')
    var scrollHeight = messages.prop('scrollHeight')
    
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else{
            console.log('No error');
        }
    })
    console.log('Connected to server!')
    // socket.emit('createMessage',{
    //     'from': 'Andrew',
    //     'text': 'hey how you doing?',
    // });
});



socket.on('disconnect', () => {
    console.log('Disconnected from server!')
})

socket.on('updateUserList', function(users) {
    // console.log('Users List', users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
         ol.append(jQuery('<li></li>').text(user))
    });
    jQuery('#users').html(ol);
})

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollBottom();
    
    // console.log('newMessage',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
})


socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollBottom();

    // console.log('newLocationMessage',message);
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    // li.text(`${message.from}: ${message.text}`);
    // jQuery('#messages').append(li);
})

// socket.emit('createMessage',{
//     from: 'John',
//     text: 'hi ',
// }, function(data) {
//     console.log('Got it!',data)
// })

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    })
})

var locationButton = jQuery('#send-location');

locationButton.on('click',() =>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by browser!');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...')
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location!');
    })
})