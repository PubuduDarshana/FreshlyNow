import React, { useState } from 'react';
import ProductService from '../../services/ProductService';
import "./EditProductModal.css"

const EditProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
      title: product?.title || '',
      price: product?.price || 0,
      description: product?.description || '',
      image: product?.image || ''
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
          ...prevData,
          [name]: value
      }));
      setError(null); // Clear error when user makes changes
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
          // Validate form data
          if (!formData.title.trim()) {
              throw new Error('Title is required');
          }
          if (!formData.price || formData.price <= 0) {
              throw new Error('Price must be greater than 0');
          }

          const updatedProduct = await ProductService.updateProduct(product._id, formData);
          onUpdate(updatedProduct);
          onClose();
      } catch (err) {
          console.error('Update error:', err);
          setError(err.message || 'Failed to update product. Please try again.');
      } finally {
          setIsSubmitting(false);
      }
  };

  return (
      <div className="modal" role="dialog" aria-labelledby="edit-product-title">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2 id="edit-product-title">Edit Product</h2>
              {error && <div className="error-message">{error}</div>}
              <form onSubmit={handleSubmit}>
                  <label>
                      Title:
                      <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                      />
                  </label>
                  <label>
                      Price:
                      <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          required
                      />
                  </label>
                  <label>
                      Description:
                      <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                      />
                  </label>
                  <label>
                      Image URL:
                      <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                      />
                  </label>
                  <div className="modal-actions">
                      <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Saving...' : 'Save'}
                      </button>
                      <button type="button" onClick={onClose}>
                          Cancel
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default EditProductModal;