import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos de inicio de sesión
    };

    return (
        <div className={ styles.loginContainer }>
            <form onSubmit={ handleSubmit } className={ styles.loginForm }>
                <input
                    type="email"
                    className={ styles.inputField }
                    placeholder="Email"
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                    required
                />
                <input
                    type="password"
                    className={ styles.inputField }
                    placeholder="Password"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                />
                <button type="submit" className={ styles.submitButton }>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
