import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginUserMutation, { loading, error }] = useMutation(LOGIN, {
        onCompleted: (data) => {
            login(data.login.token); // Save the token
            setLoginSuccess(true); // Set login success state to true
            console.log('Login Response:', JSON.stringify(data, null, 2)); // Log the JSON response
        },
        onError: (error) => {
            // Handle errors
            setLoginSuccess(false); // Ensure login success is false upon error
            console.error('Error logging in:', error);
        },
    });

    // useEffect to navigate to /form upon successful login
    useEffect(() => {
        if (loginSuccess) {
            // Navigate to /form only if login was successful
            navigate(`/form`);
        }
    }, [loginSuccess, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await loginUserMutation({
                variables: formState,
            });
        } catch (e) {
            console.error('Error during login:', e);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
            </form>
            {error && <div style={{ color: 'red' }}>Login failed. Please try again.</div>}
            {loginSuccess && <div style={{ color: 'green', fontSize: '20px' }}>Login Successfully</div>}
        </div>
    );
};

export default LoginForm;
