const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const eventRoutes = require('./routes/EventRoutes');
const messageRoutes = require('./routes/MessageRoutes');
const sportRoutes = require('./routes/SportRoutes');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const requireAuthWebSocket = require('./middleware/requireAuthWebSocket');
const { measureMemory } = require('vm');
const handleNewConnection = require('./routes/ChatWebsocketRoute')


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use CORS middleware to allow requests from all origins
app.use(cors({
    origin: '*',
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/sports', sportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const server = http.createServer(app);

// Create websocket server
const io = new Server(server, {
    cors: {
        origins: ['*'],
    },
});

io.use(requireAuthWebSocket);

io.on('connection', handleNewConnection);

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
