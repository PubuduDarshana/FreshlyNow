import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import "./SignUpPage.css"

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signupUser(formData);
      navigate('/'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
