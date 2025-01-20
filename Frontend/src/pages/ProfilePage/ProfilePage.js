import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import UserProfUpdate from '../../components/UserProfUpdate/UserProfUpdate';
import "./ProfilePage.css";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpdate, setShowUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if token is missing
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await UserService.getUserProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateClick = () => {
    setShowUpdate(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>No profile data available</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <button onClick={handleUpdateClick}>Update Profile</button>
      {showUpdate && <UserProfUpdate profile={profile} />}
    </div>
  );
};

export default UserProfile;