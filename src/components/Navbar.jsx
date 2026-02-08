import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      await API.delete('/users/me');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      alert("Account deleted.");
      navigate('/');
    } catch (error) {
      alert("Failed to delete account.");
      console.error(error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">Augusta Alumni</Link>

      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            {role === 'admin' && (
              <Link to="/admin" className="hover:underline">Admin Panel</Link>
            )}
            <button onClick={handleLogout} className="hover:underline">Logout</button>
            <button onClick={handleDeleteAccount} className="hover:underline">Delete Account</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;