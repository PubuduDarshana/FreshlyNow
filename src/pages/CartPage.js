import React, { useContext } from "react";
import { CartContext } from "../context/CartContext2";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty. <span className="link" onClick={() => navigate("/")}>Continue Shopping</span></p>
            ) : (
                <div className="cartItems">
                    {cart.map((item) => (
                        <div key={item.id} className="cartItem">
                            <div>
                                <h3>{item.name}</h3>
                                <p>Price: {item.price}</p>
                            </div>
                            <button className="removeButton" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button className="checkoutButton" onClick={() => navigate("/checkout")}>
                        Proceed to Checkout
                    </button>

                </div>

            )}
        </div>
    );
};

export default CartPage;
