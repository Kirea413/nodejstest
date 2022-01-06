const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    io.emit('message', JSON.stringify(req.body));
    console.log(req.body);
    res.sendStatus(200);
});

io.on('connection', socket => {
    console.log('connection');
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

httpServer.listen(3000);