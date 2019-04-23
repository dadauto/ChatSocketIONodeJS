const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('client'));

// app.get('/hola-mundo', function(req, res) {
//     res.status(200).send('Hola Mundo desde aqui');
// });

let messages = [{
    id: 1,
    text: 'Bienvenidos al chat privado de Socket.io y NodeJS de Daniel Adauto',
    nickname: 'Bot - dadauto@syslacsdev.com'
}];

io.on("connection", function (socket) {
    console.log('El cliente con IP: ' + socket.handshake.address + ' se conectado.');
    socket.emit('messages', messages);
    socket.on('add-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function () {
    console.log('Servidor Esta funcionando');
});