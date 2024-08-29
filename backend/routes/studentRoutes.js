const express = require('express');
const { enrollInCourse, getEnrollments } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/enroll', authMiddleware, enrollInCourse);
router.get('/enrollments', authMiddleware, getEnrollments);

module.exports = router;
