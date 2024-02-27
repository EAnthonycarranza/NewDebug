// src/pages/UserLogin.js
import React from 'react';
import LoginForm from '../components/LoginForm';

const UserLogin = () => {
  return (
    <div>
      <h2>User Login</h2>
      <LoginForm isAdmin={false} />
    </div>
  );
};

export default UserLogin;
