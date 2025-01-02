import React, { useContext } from "react";
import { CartContext } from "../context/CartContext2";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCart([]); // Clear the cart after checkout
    navigate("/"); // Redirect to home page
    alert("Thank you for your purchase!");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <span className="link" onClick={() => navigate("/")}>Continue Shopping</span></p>
      ) : (
        <>
          <div className="cartItem">
            {cart.map((item) => (
              <div key={item.id} className="cartItem">
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: {item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="checkoutButton" onClick={handleCheckout}>
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
