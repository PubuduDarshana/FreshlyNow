import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartProvider from "./context/CartContext2";
import CartPage from "./pages/CartPage/CartPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import ProductAdminPage from "./pages/ProductAdminPage/ProductAdminPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import UserLoginSignup from "./pages/UserLoginSignup/UserLoginSignup";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import OrderAdminPage from "./pages/OrderAdminPage/OrderAdminPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<><Banner /><ProductGrid /></>} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            } />
            <Route path="/productAdmin" element={
              <ProtectedRoute requireAdmin={true}>
                <ProductAdminPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<UserLoginSignup />} />
            <Route path="/signup" element={<UserLoginSignup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/ordersAdmin" element={
              <ProtectedRoute requireAdmin={true}>
                <OrderAdminPage/>
              </ProtectedRoute>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
