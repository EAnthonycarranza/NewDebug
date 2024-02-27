import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import authService from '../utils/auth'; // Corrected import

export default function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      authService.login(data.login.token); // Correct usage of authService
      navigate('/dashboard'); // Adjust as per your route
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formState.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={!formState.email || !formState.password}>
        Submit
      </button>
      {error && <div>Login failed</div>}
    </form>
  );
}
