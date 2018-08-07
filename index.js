var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
const port = process.env.PORT || 3000;

var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

const Chat = require('./chat');


const MongoStore = require('connect-mongo')
var mongoose = require('mongoose');
mongoose.connect('mongodb://sanitish:sanitsum@ds121099.mlab.com:21099/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error : '));


// Socket setup & pass server
var client = socket(server);
client.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    // Handle chat event and save to db

    socket.on('chat', function(data){
       const msgg = new Chat({
          name: data.handle,
          msg: data.message,
          isRecived:false
        })

// Check for name and message
//if(let handle == '' || message == '')
{
    // Send error status
    //sendStatus('Please enter a name and message');
}// else
{

    msgg.save(function(err) {
      if (err) {
        //return next(err);
      }
     console.log(msgg);
    })
  }    // console.log(data);

        client.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);


    });

    socket.on('recived', function(data){
        socket.broadcast.emit('recived', data);
        const msgg = new Chat({

           isRecived: data.isRecived
         })

     msgg.save(function(err) {
       if (err) {

       }
      console.log(msgg);
     })



    });

});
