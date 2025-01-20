// import React, { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const decodedUser = jwtDecode(token);
//                 setUser(decodedUser);
//             } catch (error) {
//                 console.error("Invalid token");
//                 localStorage.removeItem("token");
//             }
//         }
//     }, []);

//     const login = (token) => {
//         localStorage.setItem("token", token);
//         const decodedUser = jwtDecode(token);
//         setUser(decodedUser);
//     };

//     const logout = () => {
//         localStorage.removeItem("token");
//         setUser(null);
//         navigate("/login");
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
