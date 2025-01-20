import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext2";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import styles from "./CartPage.module.css";
import CartService from "../../services/CartService";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, clearCart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;

    useEffect(() => {
        const fetchCartData = async () => {
            if (user) {
                try {
                    const response = await CartService.getCart(user.id);
                    if (response && response.message === "Cart was fetched successfully") {
                        // Transform the cart data to match your frontend structure
                        const cartItems = response.cart.products.map(item => ({
                            ...item.productId, // Spread the product details
                            quantity: item.quantity,
                            _id: item.productId._id // Ensure _id is set correctly
                        }));
                        // Set the cart directly instead of adding items one by one
                        setCart(cartItems);
                    }   
                } catch (error) {
                    console.error("Failed to fetch cart data", error);
                }
            }
        };
        fetchCartData();
    }, [setCart, user]);

    const handleUpdateQuantity = async (itemId, quantityChange) => {
        try {
            const response = await CartService.updateCart(itemId, quantityChange, user.id);
            if (response && response.message === "Cart updated successfully") {
                updateQuantity(itemId, quantityChange);
            }
        } catch (error) {
            console.error("Failed to update cart", error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const response = await CartService.removeFromCart(itemId, user.id);
            if (response && response.message === "Product removed from cart successfully") {
                removeFromCart(itemId);
            }
        } catch (error) {
            console.error("Failed to update cart", error);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Your Cart</h1>
            {!user ? (<p>Hello user, please <span className={styles.link} onClick={() => navigate("/login")}>login</span> to continue shopping</p>) :
                (cart.length === 0 ? (
                    <p>Hello {user.name}, Your cart is empty. <span className={styles.link} onClick={() => navigate("/")}>Continue Shopping</span></p>
                ) : (
                    <div className={styles.cartItems}>
                        {cart.map((item) => (
                            <div key={item._id} className={styles.cartItem}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <img src={item.image} alt={item.title} />
                                    <div>
                                        <button onClick={() => handleUpdateQuantity(item._id, 1)}>+</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleUpdateQuantity(item._id, -1)}>−</button>
                                    </div>
                                </div>
                                <button className={styles.removeButton} onClick={() => handleRemoveItem(item._id)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <p>Total Items: {totalItems}</p>
                        <button className={styles.clearButton} onClick={clearCart}>Clear Cart</button>
                        <button className={styles.checkoutButton} onClick={() => navigate("/checkout")}>
                            Proceed to Checkout
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default CartPage;
