import React, { useState, useEffect } from 'react';
import OrderService from '../../services/OrderService';
import { format } from 'date-fns';
import './OrderAdminPage.css';

const OrderAdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateStatus, setUpdateStatus] = useState({});

    const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await OrderService.getOrders();
            setOrders(response.orders || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch orders');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdateStatus(prev => ({ ...prev, [orderId]: true }));
        try {
            const response = await OrderService.updateOrderStatus(orderId, newStatus);
            if (response.success) {
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId 
                            ? { ...order, status: newStatus }
                            : order
                    )
                );
                setError(null);
            }
        } catch (err) {
            setError('Failed to update order status');
            console.error('Error updating order status:', err);
        } finally {
            setUpdateStatus(prev => ({ ...prev, [orderId]: false }));
        }
    };

    if (loading) return <div className="loading">Loading orders...</div>;

    return (
        <div className="order-admin-container">
            <h1>Order Management</h1>
            {error && <div className="error-message">{error}</div>}
            <div className="orders-table-container">
                {orders.length === 0 ? (
                    <div className="no-orders">No orders found</div>
                ) : (
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Email</th>
                                <th>Products</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.userId?.name || 'Unknown'}</td>
                                    <td>
                                        <div className="products-list">
                                            {order.products.map((product, idx) => (
                                                <div key={idx} className="product-item">
                                                    <span>{product.productId?.title || 'Product not found'}</span>
                                                    <span>Qty: {product.quantity}</span>
                                                    <span>${product.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>{format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}</td>
                                    <td>
                                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            disabled={updateStatus[order._id]}
                                            className="status-select"
                                        >
                                            {orderStatuses.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default OrderAdminPage;