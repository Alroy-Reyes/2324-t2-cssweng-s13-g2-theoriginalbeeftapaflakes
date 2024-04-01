import React, { useState } from 'react';
import './Login.css';
import { USERS_URL } from '../../API/constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/authenticate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.status === 200) {
                const authentication = await response.json();
                localStorage.setItem('jwt', authentication.token);
                redirectTo('/');
            }

            if (response.status === 400) {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <section className="login-section">
                    <h2>LOG IN</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="login-input-group">
                            <label htmlFor="email">EMAIL ADDRESS *</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="password">PASSWORD *</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="login-button">LOG IN</button>
                        <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                        {loginError && <p className="login-error-message">{loginError}</p>}
                    </form>
                </section>
                <section className="new-customer-section">
                    <h2>NEW CUSTOMER</h2>
                    <p>Create an account with us and you'll be able to:</p>
                    <ul className="benefits-list">
                        <li>Check out faster</li>
                        <li>Save multiple shipping addresses</li>
                        <li>Access your order history</li>
                        <li>Track new orders</li>
                    </ul>
                    <button onClick={() => redirectTo('/register')} className="create-account-button">CREATE ACCOUNT</button>
                </section>
            </div>
        </div>
    );
};

const redirectTo = (route) => {
    window.location.href = route;
};

export default Login;
