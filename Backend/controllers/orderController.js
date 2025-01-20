// orderController.js
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');  // Add this import


exports.createOrder = async (req, res) => {

    try {
        const { id: userId } = req.user; // Changed from req.user.userId
        const { cartItems } = req.body; // Get cart items from request body

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Calculate total and prepare order items
        let totalPrice = 0;
        const orderItems = [];

        // Check stock and update products
        for (const item of cartItems) {
            const product = await Product.findById(item._id);
            if (!product) {
                return res.status(404).json({ error: `Product ${item._id} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: `Insufficient stock for ${product.title}. Available: ${product.stock}`
                });
            }

            // Update product stock
            product.stock -= item.quantity;
            await product.save();

            // Add to order items
            orderItems.push({
                productId: item._id,
                quantity: item.quantity,
                price: item.price
            });

            totalPrice += item.price * item.quantity;
        }

        // Create new order
        const newOrder = new Order({
            userId,
            products: orderItems,
            totalPrice,
            status: 'Pending'
        });

        await newOrder.save();

        // Clear the user's cart
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to place order' });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'products.productId',
                select: 'title'
            })
            

        if (!orders || orders.length === 0) {
            return res.json({ orders: [] }); // Return empty array instead of error
        }

        res.status(200).json({ orders }); // Wrap orders in an object
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        ).populate({
            path: 'products.productId',
            select: 'title'
        });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            success: true,
            message: 'Order status updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        console.error('Order status update error:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};