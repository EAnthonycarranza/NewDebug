import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CompositeForm from './components/CompostiteForm';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserDashboard from './components/UserDashboard';
// Import other components as needed

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* Navigation links */}
        </nav>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/personalinformation/:userId" element={<UserDashboard />} />
          <Route path="/form" element={<CompositeForm />} />
          {/* Define other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
