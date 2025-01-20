import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext2";
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";
import { jwtDecode } from "jwt-decode";
import "./ProductDetails.css";

const ProductDetails = () => {

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await ProductService.getProduct(id);
        setProduct(fetchedProduct);
        console.log('Products fetched:', fetchedProduct);
      } catch (error) {
        console.error('Error fetching the product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(product, quantity);
      CartService.addToCart(product._id, quantity, user.id);
      setQuantity(1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <img src={product.image} alt={product.title} />
      <h1>{product.title}</h1>
      <h2>Price: ${product.price}</h2>
      <h3>{product.category}</h3>
      <p>{product.description}</p>

      <div className="quantity-container">
        <button className="button" onClick={handleDecreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button className="button" onClick={handleIncreaseQuantity}>+</button>
      </div>

      <div className="button-container">
        <button className="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
