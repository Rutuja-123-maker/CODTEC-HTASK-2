const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// In-memory message history
let messageHistory = [];

// Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send message history to the new user
  socket.emit('messageHistory', messageHistory);

  // Handle incoming chat messages
  socket.on('chatMessage', (message) => {
    messageHistory.push(message);  // Store message in history
    io.emit('chatMessage', message);  // Broadcast the message to all clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
