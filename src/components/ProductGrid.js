import React from "react";
import { Link } from "react-router-dom";
import "./ProductGrid.css"
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
    const navigate = useNavigate();
    const products = [
        { id: 1, name: "Product 1", price: "$10" },
        { id: 2, name: "Product 2", price: "$20" },
        { id: 3, name: "Product 3", price: "$30" },
        { id: 4, name: "Product 4", price: "$40" },
    ];

    return (
        <div className="grid">
            {products.map((product) => (
                <div key={product.id} className="card" onClick={() => navigate(`/product/${product.id}`)}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <Link to={`/product/${product.id}`} className="link">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
