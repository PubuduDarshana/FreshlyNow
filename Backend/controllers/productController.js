const Product = require('../models/product');
const mongoose = require('mongoose');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { title, price, description, category, image, stock } = req.body;
        const product = new Product({ title, price, description, category, image, stock });
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate if id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        // Validate required fields
        if (!updateData.title || !updateData.price) {
            return res.status(400).json({ error: 'Title and price are required' });
        }

        // Ensure price is a number
        updateData.price = Number(updateData.price);
        if (isNaN(updateData.price)) {
            return res.status(400).json({ error: 'Price must be a valid number' });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ 
            error: 'Failed to update product',
            details: error.message 
        });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};
