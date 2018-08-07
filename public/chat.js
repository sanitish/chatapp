// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn1 = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      btn2 = document.getElementById('recived');


// Emit events
btn1.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});
btn2.addEventListener('click', function(){
    socket.emit('recived', {
         isRecived: true
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});


socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
});
socket.on('recivedj', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is recied by the owner...</em></p>';
});
