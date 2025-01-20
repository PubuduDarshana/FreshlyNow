import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext2";
import { Link, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { jwtDecode } from 'jwt-decode';
import "./Header.css";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle the dropdown visibility
  };

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  return (
    <header className="header">
      <h1 className="logo" onClick={() => navigate('/')}>Freshly Now</h1>
      <nav>
        <ul className="navList">
          <li>
            <div className="dropdown-container">
              {/* Icon to trigger the dropdown */}
              <Link>
                <i
                  className="fa-solid fa-user"
                  onClick={toggleDropdown}
                  style={{ cursor: "pointer" }}
                ></i>
              </Link>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <Link to="/login" onClick={() => setDropdownVisible(false)}>Login/ Signup</Link>
                    </li>
                    <li>
                      <Link to="/profile" onClick={() => setDropdownVisible(false)}>Profile</Link>
                    </li>
                    <li>
                      <Link to="/orders" onClick={() => setDropdownVisible(false)}>Order History</Link>
                    </li>
                    <li>
                      <Link to="/logout" onClick={() => {
                        setDropdownVisible(false);
                        localStorage.removeItem('token'); // Remove the token
                        setTimeout(() => {
                          navigate('/');
                        }, 0);
                      }}>Logout</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
          {user?.role === 'admin' && (
            <ProtectedRoute>
              <li><Link to="/ordersAdmin"><i class="fa-solid fa-box"></i></Link></li>
            </ProtectedRoute>
          )}
              <li><Link to="/productAdmin"><i className="fa-solid fa-arrow-up"></i></Link></li>
          <li><Link to="/"><i className="fa-solid fa-house"></i></Link></li>
          <li><Link to="/cart"><i className="fa-solid fa-cart-shopping"></i>{" "}<div className="red">{cart.length}</div></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;


