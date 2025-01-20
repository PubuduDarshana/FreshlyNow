import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import "./ProductGrid.css"

const ProductGrid = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getProducts();
                setProducts(data);
                console.log('Products fetched:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="grid">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="card"
                    onClick={() => navigate(`/product/${product._id}`)}
                >
                    <h3>{product.title}</h3>
                    <img src={product.image} alt={product.title} />
                    <p>${product.price.toFixed(2)}</p>
                    <Link
                        to={`/product/${product._id}`}
                        className="link"
                        onClick={(e) => e.stopPropagation()}
                    >
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
