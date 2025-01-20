const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/admin');
const router = express.Router();

// Admin route to view all orders
router.get('/orders', adminMiddleware, getAllOrders);

// Admin route to update order status
router.patch('/orders/:orderId', adminMiddleware, updateOrderStatus);

module.exports = router;
