const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const authMiddleware = require('./middlewares/auth');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

// app.js or index.js
require('./models/user');
require('./models/order');
require('./models/product');
require('./models/cart');

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',  // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Freshly Now Store!');
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

module.exports = app;