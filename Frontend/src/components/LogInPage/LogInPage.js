import React, { useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import "./LogInPage.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await AuthService.loginUser(formData);
            await login(response.token); // This will handle cart synchronization
            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <p>Please login to continue.</p>
            <h2>Login</h2>
            <br />
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;