const express = require('express');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

router.post('/', adminMiddleware, createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', adminMiddleware, updateProduct);
router.delete('/:id', adminMiddleware, deleteProduct);

module.exports = router;
