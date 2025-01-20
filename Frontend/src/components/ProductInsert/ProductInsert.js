import React, { useState } from "react";
import './ProductInsert.css'
import ProductService from "../../services/ProductService";
const ProductInsert = () => {

    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
        stock: 0
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await ProductService.addProduct(formData);
            console.log("Response:", response.data);
            alert("Form submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit form.");
        }
    };

    return (
        <div>
        <h1>Insert New Products</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Price $</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default ProductInsert;