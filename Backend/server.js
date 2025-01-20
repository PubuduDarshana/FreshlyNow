const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const app = require('./app');

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'))
    .catch(err => console.error('DB connection error:', err));

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

console.log("Welcome to Freshly Now store");

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Example route to render the main page
app.get('/', (req, res) => {
    res.render('index', { title: 'E-Commerce App' });
  });