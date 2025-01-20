import React, { useState, useEffect } from 'react';
import EditProductModal from '../EditProductModal/EditProductModal'; // Modal Component
import ProductService from '../../services/ProductService';
import './ProductUpdate.css';

const ProductUpdate = () => {
    const [products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch Products
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

    // Open Edit Modal
    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    // Close Edit Modal
    const closeEditModal = () => {
        setSelectedProduct(null);
        setIsEditModalOpen(false);
    };

    // Handle Delete
    const handleDelete = (_id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            ProductService.deleteProduct(_id)
                .then(() => setProducts(products.filter((product) => product._id !== _id)))
                .catch((err) => console.error(err));
        }
    };

    return (
        <div>
            <h1>Product Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product?._id || Math.random()}>
                            <td data-label="Title">{product.title}</td>
                            <td data-label="Price">${product.price}</td>
                            <td data-label="Image"><img src={product.image} alt={product.title} /></td>
                            <td data-label="Actions">
                                <button onClick={() => openEditModal(product)}>Edit</button>
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Product Modal */}
            {isEditModalOpen && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={closeEditModal}
                    onUpdate={(updatedProduct) => {
                        setProducts((prev) =>
                            prev.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod))
                        );
                        closeEditModal();
                    }}
                />
            )}
        </div>
    );
};

export default ProductUpdate;
