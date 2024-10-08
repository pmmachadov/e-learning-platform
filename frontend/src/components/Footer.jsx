import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={ styles.footer }>
            <p className={ styles.footerText }>© 2024 E-learning Platform</p>
        </footer>
    );
};

export default Footer;
