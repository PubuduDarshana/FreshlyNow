const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.post('/', authMiddleware, createOrder);  // Protected route
router.get('/', authMiddleware, getOrders);  // Protected route //is this necessary? seeing all orders is enough I think
router.patch('/:orderId/status', authMiddleware, updateOrderStatus);

module.exports = router;
