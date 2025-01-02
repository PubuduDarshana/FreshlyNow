import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import ProductDetails from "./pages/ProductDetails";
import CartProvider from "./context/CartContext2";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<><Banner /><ProductGrid /></>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOut />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
