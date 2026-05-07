import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin'
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/test`)
      .then(res => {
        console.log('API Response:', res.data);
      })
      .catch(err => {
        console.error('API Error:', err);
      });
  }, []);


  return (
    <Router>
      <div>
        {/*<nav>
          <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link>
        </nav>*/}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App;

