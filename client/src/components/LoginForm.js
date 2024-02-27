import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, ADMIN_LOGIN } from '../utils/mutations';

const LoginForm = ({ isAdmin = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(isAdmin ? ADMIN_LOGIN : LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      // Handle storing the token and redirecting the user here
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
