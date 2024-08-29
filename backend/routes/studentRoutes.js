const express = require('express');
const { enrollInCourse, getEnrollments } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

const router = express.Router();

// Ensure you're correctly passing a function as a callback
router.post('/enroll', authMiddleware, enrollInCourse); // Protect this route
router.get('/enrollments', authMiddleware, getEnrollments); // Protect this route

module.exports = router;
