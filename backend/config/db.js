const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

const addDataIfNotExists = async () => {
    try {
        await connectDB();

        const users = [
            { username: 'student1', email: 'student1@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'student2', email: 'student2@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'student3', email: 'student3@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'teacher1', email: 'teacher1@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'teacher' },
            { username: 'teacher2', email: 'teacher2@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'teacher' },
        ];

        for (let userData of users) {
            let user = await User.findOne({ email: userData.email });
            if (!user) {
                await User.create(userData);
                console.log(`User ${userData.username} added`);
            }
        }

        // Courses
        const courses = [
            { title: 'React for Beginners', description: 'An introductory course on React.js', instructor: 'John Doe', duration: 10 },
            { title: 'Node.js Advanced', description: 'A deep dive into Node.js features', instructor: 'Jane Smith', duration: 15 },
            { title: 'Python for Data Science', description: 'Learn Python with a focus on data science and machine learning', instructor: 'Alice Johnson', duration: 20 },
            { title: 'Web Design with HTML & CSS', description: 'Learn the basics of web design using HTML and CSS', instructor: 'Bob Brown', duration: 8 },
            { title: 'Introduction to Databases', description: 'A beginner course on databases and SQL', instructor: 'Chris White', duration: 12 },
        ];

        for (let courseData of courses) {
            let course = await Course.findOne({ title: courseData.title });
            if (!course) {
                await Course.create(courseData);
                console.log(`Course "${courseData.title}" added`);
            }
        }

        // Enrollments
        const student1 = await User.findOne({ email: 'student1@example.com' });
        const student2 = await User.findOne({ email: 'student2@example.com' });
        const student3 = await User.findOne({ email: 'student3@example.com' });

        const reactCourse = await Course.findOne({ title: 'React for Beginners' });
        const nodeCourse = await Course.findOne({ title: 'Node.js Advanced' });
        const pythonCourse = await Course.findOne({ title: 'Python for Data Science' });

        const enrollments = [
            { user: student1._id, course: reactCourse._id, progress: 50 },
            { user: student1._id, course: pythonCourse._id, progress: 20 },
            { user: student2._id, course: nodeCourse._id, progress: 30 },
            { user: student2._id, course: reactCourse._id, progress: 10 },
            { user: student3._id, course: pythonCourse._id, progress: 70 },
            { user: student3._id, course: nodeCourse._id, progress: 40 },
        ];

        for (let enrollmentData of enrollments) {
            let enrollment = await Enrollment.findOne({ user: enrollmentData.user, course: enrollmentData.course });
            if (!enrollment) {
                await Enrollment.create(enrollmentData);
                console.log(`Enrollment of ${enrollmentData.user} in course ${enrollmentData.course} added`);
            }
        }

        // Close the connection
        mongoose.connection.close();
        console.log('Data verification and insertion complete');
    } catch (error) {
        console.error(error);
        mongoose.connection.close();
    }
};

// Execute the function
addDataIfNotExists();
