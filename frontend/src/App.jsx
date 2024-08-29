import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/courses" element={ <Courses /> } />
        <Route path="/courses/:id" element={ <CourseDetail /> } />
        <Route path="/dashboard" element={ <StudentDashboard /> } />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
