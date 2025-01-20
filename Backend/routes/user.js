const express = require('express');
const { getUserProfile, updateUserProfile, updatePassword, getUserOrders } = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Get and update user profile
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Change user password
router.put('/password', authMiddleware, updatePassword);

// Get user's order history
router.get('/orders', authMiddleware, getUserOrders);

module.exports = router;
