import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:3000/login', { username, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Check the user role and redirect accordingly
      if (response.data.role === 'admin') {
        window.location.href = '/adminmenu'; // Redirect to admin menu
      } else if (response.data.role === 'customer') {
        window.location.href = '/menu'; // Redirect to customer menu
      } else {
        setError('Unknown role, cannot redirect');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container1">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Login
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Login;
