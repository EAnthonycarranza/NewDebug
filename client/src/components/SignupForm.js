import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations';
import { login } from '../utils/auth'; // Assuming you want to log the user in immediately after registration

const SignupForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
        onCompleted: (data) => {
            // Assuming you want to automatically log the user in after successful registration
            login(data.register.token);
            console.log('Signup successful!', data);
            // Optionally, redirect the user or display a success message
        },
        onError: (error) => {
            console.error('Signup error:', error);
        },
    });

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
            await registerUser({
                variables: formState,
            });
        } catch (e) {
            console.error('Error during signup:', e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                />
            </div>
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
            <button type="submit" disabled={loading}>Sign Up</button>
            {error && <div>Signup failed. Please try again.</div>}
        </form>
    );
};

export default SignupForm;
