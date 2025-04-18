import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext2";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./CartPage.module.css";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;

    const handleUpdateQuantity = async (itemId, quantityChange) => {
        await updateQuantity(itemId, quantityChange);
    };

    const handleRemoveItem = async (itemId) => {
        await removeFromCart(itemId);
    };

    return (
        <div className={styles.container}>
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>
                    {user ? `Hello ${user.name}, your` : 'Your'} cart is empty.{' '}
                    <span className={styles.link} onClick={() => navigate("/")}>
                        Continue Shopping
                    </span>
                </p>
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
                    <button 
                        className={styles.checkoutButton} 
                        onClick={() => {
                            if (!user) {
                                navigate("/login");
                            } else {
                                navigate("/checkout");
                            }
                        }}
                    >
                        {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
