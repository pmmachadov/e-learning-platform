const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

        console.log('--- Starting User Insertion/Update ---');

        const users = [
            { username: 'student1', email: 'student1@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'student2', email: 'student2@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'student3', email: 'student3@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'student' },
            { username: 'teacher1', email: 'teacher1@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'teacher' },
            { username: 'teacher2', email: 'teacher2@example.com', password: '$2a$10$KxJ9u5EtWLn/j3S/f5e3gOpQ2dQ3N5g4mM5J9YIHKAIg3lX3U9rO2', role: 'teacher' },
        ];

        for (let userData of users) {
            const result = await User.findOneAndUpdate(
                { email: userData.email },  // Filtra por email
                userData,  // Datos a actualizar o insertar
                { upsert: true, new: true }  // Crea un nuevo documento si no existe, y devuelve el documento actualizado
            );
            console.log(`[User Insertion/Update] User ${result.username} added or updated successfully`);
        }

        console.log('--- User Insertion/Update Complete ---');

        console.log('--- Starting Course Insertion/Update ---');

        // Courses
        const courses = [
            { title: 'Yoga for Beginners', description: 'An introductory course on yoga practices and philosophy', instructor: 'John Doe', duration: 10 },
            { title: 'Advanced Relaxation Techniques', description: 'A deep dive into advanced relaxation methods', instructor: 'Jane Smith', duration: 15 },
            { title: 'Breathing for Wellness', description: 'Learn breathing techniques to enhance mental and physical well-being', instructor: 'Alice Johnson', duration: 20 },
            { title: 'Meditation and Mindfulness', description: 'Learn the basics of meditation and mindfulness practices', instructor: 'Bob Brown', duration: 8 },
            { title: 'Introduction to Yoga Nidra', description: 'A beginner course on Yoga Nidra, the yoga of sleep', instructor: 'Chris White', duration: 12 },
        ];

        for (let courseData of courses) {
            const result = await Course.findOneAndUpdate(
                { title: courseData.title },  // Filtra por título del curso
                courseData,  // Datos a actualizar o insertar
                { upsert: true, new: true }  // Crea un nuevo documento si no existe, y devuelve el documento actualizado
            );
            console.log(`[Course Insertion/Update] Course "${result.title}" added or updated successfully`);
        }

        console.log('--- Course Insertion/Update Complete ---');

        console.log('--- Starting Enrollment Insertion/Update ---');

        // Enrollments
        const student1 = await User.findOne({ email: 'student1@example.com' });
        const student2 = await User.findOne({ email: 'student2@example.com' });
        const student3 = await User.findOne({ email: 'student3@example.com' });

        const yogaCourse = await Course.findOne({ title: 'Yoga for Beginners' });
        const relaxationCourse = await Course.findOne({ title: 'Advanced Relaxation Techniques' });
        const breathingCourse = await Course.findOne({ title: 'Breathing for Wellness' });

        const enrollments = [
            { user: student1._id, course: yogaCourse._id, progress: 50 },
            { user: student1._id, course: breathingCourse._id, progress: 20 },
            { user: student2._id, course: relaxationCourse._id, progress: 30 },
            { user: student2._id, course: yogaCourse._id, progress: 10 },
            { user: student3._id, course: breathingCourse._id, progress: 70 },
            { user: student3._id, course: relaxationCourse._id, progress: 40 },
        ];

        for (let enrollmentData of enrollments) {
            const result = await Enrollment.findOneAndUpdate(
                { user: enrollmentData.user, course: enrollmentData.course },  // Filtra por usuario y curso
                enrollmentData,  // Datos a actualizar o insertar
                { upsert: true, new: true }  // Crea un nuevo documento si no existe, y devuelve el documento actualizado
            );
            console.log(`[Enrollment Insertion/Update] Enrollment of user ${result.user} in course ${result.course} added or updated successfully`);
        }

        console.log('--- Enrollment Insertion/Update Complete ---');

        // Close the connection
        mongoose.connection.close();
        console.log('Data verification and insertion complete. Connection closed.');
    } catch (error) {
        console.error('An error occurred during data insertion:', error);
        mongoose.connection.close();
    }
};

// Execute the function
addDataIfNotExists();
