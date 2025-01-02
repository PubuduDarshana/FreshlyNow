import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext2";
import "./ProductDetails.css"

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const productData = {
    1: { id: 1, name: "Product 1", description: "This is Product 1", price: "$10" },
    2: { id: 2, name: "Product 2", description: "This is Product 2", price: "$20" },
    3: { id: 3, name: "Product 3", description: "This is Product 3", price: "$30" },
    4: { id: 4, name: "Product 4", description: "This is Product 4", price: "$40" },
  };

  const product = productData[id];

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button className="button" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <button className="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default ProductDetails;
