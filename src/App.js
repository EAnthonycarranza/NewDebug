import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
