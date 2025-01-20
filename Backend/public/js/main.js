// Handle adding to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        addToCart(productId);
    });
});

// Add product to cart
function addToCart(productId) {
    fetch(`/api/cart/add/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added to cart');
            location.reload(); // Reload the page to update cart
        }
    });
}

// Handle removing from cart
document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-id');
        removeFromCart(productId);
    });
});

// Remove product from cart
function removeFromCart(productId) {
    fetch(`/api/cart/remove/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product removed from cart');
            location.reload(); // Reload the page to update cart
        }
    });
}



app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

app.get('/product/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
});

app.get('/cart', async (req, res) => {
    const cart = req.session.cart || [];
    const total = calculateTotal(cart);
    res.render('cart', { cart, total });
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});
