import React, { useState } from 'react';
import UserService from '../../services/UserService';
import "./UserProfUpdate.css";

const UserProfUpdate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [activeTab, setActiveTab] = useState('profile');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'profile') {
                await UserService.updateUserProfile(name, email);
                console.log('Profile updated:', { name, email });
            } else if (activeTab === 'password') {
                await UserService.updatePassword(oldPassword, newPassword);
                console.log('Password updated:', { oldPassword, newPassword });
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            <div>
                <button onClick={() => setActiveTab('profile')}>Profile</button>
                <button onClick={() => setActiveTab('password')}>Password</button>
            </div>
            {activeTab === 'profile' && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            )}
            {activeTab === 'password' && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Old Password:</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                </form>
            )}
        </div>
    );
};

export default UserProfUpdate;