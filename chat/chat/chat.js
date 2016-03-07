var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on('join', function(id, client){
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message){
        if (id != senderId){
            this.clients[id].write(message);
        }
        console.log('---');
    }
    this.on('broadcast', this.subscriptions[id]);
    console.log(this);
});
channel.on('leave', function(id){
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id+" has left the chat.\n");
});
channel.on('shutdown', function(){
    channel.emit('broadcast', '', "chat has shut down. \n");
    channel.removeAllListener('broadcast');
})

var server = net.createServer(function(client){
    var id = client.remoteAddress + ':' + client.remotePort;
    console.log(id);
    channel.emit('join', id, client);

    client.on('data', function(data){
        data = data.toString();
        console.log(data);
        channel.emit('broadcast', id, data);
    });
    client.on('close', function(){
        channel.emit('leave', id);
    })
});
server.listen(8888);



//var EventEmitter = require('events').EventEmitter;
//var channel = new EventEmitter();
//channel.on('join', function(who){
//    console.log(who + ' is join');
//});
//channel.emit('join', 'wans');


//var net = require('net');
//var server = net.createServer(function(socket){
//    socket.once('data', function(data){
//        socket.write(data);
//    });
//});
//server.listen(8888);
