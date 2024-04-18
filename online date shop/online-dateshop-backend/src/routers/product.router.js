const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

// Define routes
router.get('/', ProductController.getProducts);
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updatedProduct);
router.patch('/:id', ProductController.updateStock);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
