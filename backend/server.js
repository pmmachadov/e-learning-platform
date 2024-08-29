const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const connectDB = require('./config/db'); // Import the database connection

const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB(); // Establish the MongoDB connection

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/student', studentRoutes);

// Socket.io
require('./socket')(io);

const PORT = process.env.PORT || 5173;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));