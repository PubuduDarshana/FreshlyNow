const Order = require('../models/order');

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Check if the status is valid
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};
