import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={ styles.header }>
            <nav className={ styles.nav }>
                <Link to="/" className={ styles.navLink }>Home</Link>
                <Link to="/courses" className={ styles.navLink }>Courses</Link>
                <Link to="/dashboard" className={ styles.navLink }>Dashboard</Link>
                <Link to="/login" className={ styles.navLink }>Login</Link>
                <Link to="/register" className={ styles.navLink }>Register</Link>
            </nav>
        </header>
    );
};

export default Header;
