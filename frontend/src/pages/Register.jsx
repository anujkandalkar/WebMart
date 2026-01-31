import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/auth/register', form);
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto p-4 shadow" style={{ maxWidth: '400px' }}>
        <h3 className="text-center">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input className="form-control" type="text" onChange={(e)=>setForm({...form, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input className="form-control" type="email" onChange={(e)=>setForm({...form, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input className="form-control" type="password" onChange={(e)=>setForm({...form, password: e.target.value})} required />
          </div>
          <button className="btn btn-warning w-100 fw-bold">Sign Up</button>
        </form>
      </div>
    </div>
  );
}