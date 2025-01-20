import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/users/orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Total Price: {order.totalPrice}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
