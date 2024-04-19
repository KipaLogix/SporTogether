const express = require('express');
const userRoutes = require('./routes/UserRoutes');
const eventRoutes = require('./routes/EventRoutes');

const cors = require('cors');


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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
