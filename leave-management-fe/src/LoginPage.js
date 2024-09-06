import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LoginPage.module.css';

const LoginPage = ({ setEmployee }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/employees/login', { email, password });
            setEmployee(response.data);
            navigate('/leave-requests');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8080/employees/register', {
                email,
                password,
                name,
                surname
            });
            setEmployee(response.data);
            navigate('/leave-requests');
        } catch (error) {
            setError('Registration failed. Please check your details.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.title}>{isRegistering ? 'Register' : 'Login'}</h1>
                {isRegistering && (
                    <>
                        <input
                            type="text"
                            className={styles.input}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            className={styles.input}
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            placeholder="Surname"
                        />
                    </>
                )}
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {isRegistering ? (
                    <button className={styles.button} onClick={handleRegister}>Register</button>
                ) : (
                    <button className={styles.button} onClick={handleLogin}>Login</button>
                )}
                {error && <p className={styles.error}>{error}</p>}
                <button
                    className={styles.toggleButton}
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
