import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="unauthorized-container">
            <h1 className="unauthorized-title">403 - Unauthorized Access</h1>
            <p className="unauthorized-message">
                Oops! You don't have permission to view this page.
            </p>
            <button className="unauthorized-button" onClick={handleGoBack}>
                Go to Home
            </button>
        </div>
    );
};

export default Unauthorized;