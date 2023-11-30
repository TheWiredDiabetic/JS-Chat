const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    io.emit('chat message', { username, message: 'has joined the chat', type: 'join' });
    socket.username = username; // Store the username in the socket for later use
  });

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    const username = socket.username || 'User';
    io.emit('chat message', { username, message: 'has left the chat', type: 'leave' });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
