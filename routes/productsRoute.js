const express = require('express');
const {getProducts, getProduct, getProductJSON, getCreateProductHTML, getUpdateProductHTML, getAllProductsHTML, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// dodavanje middleware fja
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(advancedResults(Product), getProducts).post(protect, createProduct);
router.route('/create').get(protect, getCreateProductHTML);
router.route('/update').get(protect, getUpdateProductHTML);
router.route('/allProducts').get(protect, getAllProductsHTML);
router.route('/:id').get(protect, getProduct).put(protect, updateProduct).delete(protect, deleteProduct);
router.route('/:id/json').get(protect, getProductJSON);

module.exports = router;