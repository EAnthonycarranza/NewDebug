// src/pages/AdminLogin.js
import React from 'react';
import LoginForm from '../components/LoginForm';

const AdminLogin = () => {
  return (
    <div>
      <h2>Admin Login</h2>
      <LoginForm isAdmin={true} />
    </div>
  );
};

export default AdminLogin;
