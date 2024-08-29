const Enrollment = require('../models/Enrollment');

exports.enrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;
    try {
        const enrollment = new Enrollment({ user: userId, course: courseId });
        await enrollment.save();
        res.json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error enrolling in course' });
    }
};

exports.getEnrollments = async (req, res) => {
    const userId = req.user.id;
    try {
        const enrollments = await Enrollment.find({ user: userId }).populate('course');
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching enrollments' });
    }
};
