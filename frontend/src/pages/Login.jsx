import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert("Login Successful!");
      navigate('/');
      window.location.reload(); // Refresh to update Navbar state
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4 fw-bold">Sign-In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="email@example.com"
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="At least 6 characters"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-warning w-100 fw-bold shadow-sm mb-3">
            Sign In
          </button>
        </form>
        <p className="small text-center text-muted">
          By continuing, you agree to WebMart's Conditions of Use.
        </p>
        <hr />
        <p className="text-center small">New to WebMart?</p>
        <Link to="/register" className="btn btn-outline-secondary w-100 btn-sm">
          Create your WebMart account
        </Link>
      </div>
    </div>
  );
}