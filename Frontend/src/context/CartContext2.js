  import React, { createContext, useState } from "react";

  export const CartContext = createContext();

  const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product,q) => {
      
      if (!product || !product._id) {
        console.error("Invalid product data");
        return;
      }

      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item._id === product._id);
        if (existingProduct) {
          // Increase quantity if product already in cart
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + q }
              : item
          );
        }
        // Add new product to cart
        return [...prevCart, { ...product, quantity: q }];
      });
    };

    const removeFromCart = (_id) => {
      if (!_id) {
        console.error("Invalid product ID");  
        return;
      }

      setCart((prevCart) =>
        prevCart.filter((item) => item._id !== _id)
      );
    };

    const updateQuantity = (_id, delta) => {
      if (!_id || typeof delta !== 'number') {
        console.error("Invalid parameters for updateQuantity");
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === _id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      );
    };

    const clearCart = () => {
      setCart([]);
    };

    return (
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          removeFromCart,
          updateQuantity,
          clearCart,
          setCart,
          totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        }}
      >
        {children}
      </CartContext.Provider>
    );
  };

  export default CartProvider;