const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Listen for WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for messages from the client
    socket.on('message', (data) => {
        console.log('Message received from client:', data);
        // Send a response back to the client
        socket.emit( 'message',"WE GOT YOUR MESSAGE");
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
