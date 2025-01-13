import React, { useState } from 'react';
import axios from 'axios';
import './CSS/Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: { username, password, role },
      });
      localStorage.setItem('token', response.data.token);
      setIsSignedUp(true);  // Set the signup success flag
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  // const handleLoginRedirect = () => {
  //   window.location.href = '/login';  // Redirect to login page
  // };

  return (
    <div className="form-container">
      <h2 className="form-title">Signup</h2>
      {!isSignedUp ? (
        <form onSubmit={handleSignup} className="form">
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="form-button">
            Signup
          </button>
        </form>
      ) : (
        // <div className="signup-success">
        //   <p>Signup successful! Please <span onClick={handleLoginRedirect} className="login-link">Login</span> to access your account.</p>
        // </div>

          <div className="signup-success">
          <p>Signup successful! Please <a href="/login" className="login-link">Login</a> to access your account.</p>
          </div>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Signup;
