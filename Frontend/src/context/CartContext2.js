import React, { createContext, useState, useEffect } from "react";
import CartService from "../services/CartService";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage
    const savedCart = localStorage.getItem('guestCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const syncCartWithBackend = async (userId) => {
    try {
      const response = await CartService.getCart(userId);
      if (response && response.message === "Cart was fetched successfully") {
        const cartItems = response.cart.products.map(item => ({
          ...item.productId,
          quantity: item.quantity,
          _id: item.productId._id
        }));
        setCart(cartItems);
      }
    } catch (error) {
      console.error("Failed to sync cart with backend:", error);
    }
  };

  // Save guest cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('guestCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, q) => {
    if (!product || !product._id) {
      console.error("Invalid product data");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      const newCart = existingProduct
        ? prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + q }
              : item
          )
        : [...prevCart, { ...product, quantity: q }];
      return newCart;
    });

    // If user is logged in, sync with backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await CartService.addToCart(product._id, q, JSON.parse(atob(token.split('.')[1])).id);
      } catch (error) {
        console.error("Failed to sync cart with backend:", error);
      }
    }
  };

  const removeFromCart = async (_id) => {
    if (!_id) {
      console.error("Invalid product ID");
      return;
    }

    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));

    // If user is logged in, sync with backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await CartService.removeFromCart(_id, JSON.parse(atob(token.split('.')[1])).id);
      } catch (error) {
        console.error("Failed to sync cart removal with backend:", error);
      }
    }
  };

  const updateQuantity = async (_id, delta) => {
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

    // If user is logged in, sync with backend
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await CartService.updateCart(_id, delta, JSON.parse(atob(token.split('.')[1])).id);
      } catch (error) {
        console.error("Failed to sync quantity update with backend:", error);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem('guestCart');
  };

  const mergeGuestCart = async (userId) => {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    if (guestCart.length > 0) {
      for (const item of guestCart) {
        try {
          await CartService.addToCart(item._id, item.quantity, userId);
        } catch (error) {
          console.error("Failed to merge guest cart item:", error);
        }
      }
      localStorage.removeItem('guestCart');
      await syncCartWithBackend(userId);
    }
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
        syncCartWithBackend,
        mergeGuestCart,
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;