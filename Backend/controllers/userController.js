const User = require('../models/user');
const Order = require('../models/order');
const bcrypt = require('bcrypt');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        );
        res.status(200).json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }
        
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update password' });
    }
};

// Get user's order history
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
