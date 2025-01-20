const Cart = require('../models/cart');
const Product = require('../models/product');

// Add Product to Cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;
        const cart = await Cart.findOne({ userId });

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const productPrice = product.price * quantity;

        if (cart) {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
            cart.totalPrice += productPrice;
            await cart.save();
        } else {
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }],
                totalPrice: productPrice,
            });
            await newCart.save();
        }
        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.log("error is :",error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};

// Get Cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart) return res.status(404).json({ error: 'Cart not found' });
        res.status(200).json({ message: 'Cart was fetched successfully', cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

// Update Cart
exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ error: 'Product not found' });

            const newQuantity = cart.products[productIndex].quantity + quantity;
            if (newQuantity < 0) return res.status(400).json({ error: 'Quantity cannot be negative' });

            const priceDifference = quantity * product.price;
            cart.totalPrice += priceDifference;
            cart.products[productIndex].quantity = newQuantity;
        } else {
            return res.status(404).json({ error: 'Product not found in cart' });
        }
        
        await cart.save();
        res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart' });
    }
};

// Remove Product from Cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            console.log(`Cart not found for userId: ${userId}`);
            return res.status(404).json({ error: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            const productPrice = cart.products[productIndex].quantity * product.price;
            cart.totalPrice -= productPrice;
            cart.products.splice(productIndex, 1);
            await cart.save();
        } else {
            console.log(`Product not found in cart for productId: ${productId}`);
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        res.status(200).json({ message: 'Product removed from cart successfully', cart });
    } catch (error) {
        console.log("Error removing product from cart:", error);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};
