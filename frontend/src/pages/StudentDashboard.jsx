import React, { useEffect, useState } from 'react';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/student/enrollments', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Ensure the request is JSON
                        'Accept': 'application/json',
                    },
                });

                // Check if the response is JSON
                if (res.ok) {
                    const data = await res.json();
                    setEnrollments(data);
                } else {
                    // Handle non-200 responses
                    const errorData = await res.json();
                    setError(errorData.message || 'Failed to fetch enrollments');
                }
            } catch (error) {
                // Handle network or parsing errors
                setError('An error occurred while fetching enrollments');
            }
        };

        fetchEnrollments();
    }, []);

    return (
        <div className={ styles.dashboard }>
            <h1>Your Courses</h1>
            { error ? (
                <p className={ styles.error }>{ error }</p>
            ) : (
                <ul>
                    { enrollments.map((enrollment) => (
                        <li key={ enrollment._id }>
                            <h2>{ enrollment.course.title }</h2>
                            <p>Progress: { enrollment.progress }%</p>
                        </li>
                    )) }
                </ul>
            ) }
        </div>
    );
};

export default StudentDashboard;
