import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CartContext } from "./CartContext2";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        // Clear backend cart data from frontend state
        cartContext.clearCart();
        navigate("/login");
    }, [navigate, cartContext]);

    const checkTokenExpiry = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true;
        }
    }, []);

    const login = useCallback(async (token) => {
        try {
            const decodedUser = jwtDecode(token);
            localStorage.setItem("token", token);
            setUser(decodedUser);

            // Merge guest cart with backend cart after login
            await cartContext.mergeGuestCart(decodedUser.id);

            // Set up token expiry check
            const timeUntilExpiry = (decodedUser.exp * 1000) - Date.now();
            setTimeout(() => {
                logout();
            }, timeUntilExpiry);
        } catch (error) {
            console.error("Invalid token during login:", error);
            logout();
        }
    }, [logout, cartContext]);

    // Initial auth check and token validation
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                if (checkTokenExpiry(token)) {
                    logout();
                } else {
                    const decodedUser = jwtDecode(token);
                    setUser(decodedUser);
                    // Only sync cart if cartContext is available
                    if (cartContext && cartContext.syncCartWithBackend) {
                        await cartContext.syncCartWithBackend(decodedUser.id);
                    }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, [checkTokenExpiry, logout, cartContext]);

    // Intercept 401 responses and logout
    useEffect(() => {
        const interceptor = (event) => {
            if (event.detail?.status === 401) {
                logout();
            }
        };

        window.addEventListener('unauthorized', interceptor);
        return () => window.removeEventListener('unauthorized', interceptor);
    }, [logout]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            logout,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    );
};
