import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/api'; // Make sure the path matches where your Apollo Client instance is exported
import CompositeForm from './components/CompostiteForm'; // Correct the typo in the import if necessary
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserDashboard from './components/UserDashboard';
// Import other components as needed

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <nav>
            {/* Navigation links */}
          </nav>
          <Routes>
            <Route path="/" element={<UserDashboard />} /> 
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/personalinformation/:userId" element={<UserDashboard />} />
            <Route path="/form" element={<CompositeForm />} /> 
            <Route path="/userdashboard/:userId" element={<UserDashboard />} />
            {/* Define other routes */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
