import React, { useContext } from "react";
import { CartContext } from "../context/CartContext2";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <h1 className="logo">Freshly Now</h1>
      <nav>
        <ul className="navList">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({cart.length})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
