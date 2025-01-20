import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext2";
import { useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import "./CheckOut.css";

const CheckoutPage = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (cart.length === 0) {
                setError("Cart is empty");
                return;
            }

            const response = await OrderService.createOrder(cart);
            console.log('Order created:', response);
            
            clearCart(); // Use the context method instead of directly setting cart
            navigate("/");
            alert("Thank you for your purchase!");
        } catch (error) {
            console.error("Error submitting the order:", error);
            setError(error.response?.data?.error || "Failed to submit the order");
        } finally {
            setIsLoading(false);
        }
    };

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="container">
            <h1>Checkout</h1>
            {error && <div className="error-message">{error}</div>}
            {cart.length === 0 ? (
                <p>
                    Your cart is empty.{" "}
                    <span className="link" onClick={() => navigate("/")}>
                        Continue Shopping
                    </span>
                </p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p>Unit Price: ${item.price.toFixed(2)}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                    <img src={item.image} alt="item.title" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <p>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                    <button 
                        className="checkout-button" 
                        onClick={handleCheckout} 
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Confirm Purchase"}
                    </button>
                </>
            )}
        </div>
    );
};

export default CheckoutPage;