const express = require('express');
const {getProducts, getProduct, getCreateProductHTML, getUpdateProductHTML, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// dodavanje middleware fja
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(advancedResults(Product), getProducts).post(protect, createProduct);
router.route('/create').get(protect, getCreateProductHTML);
router.route('/update').get(protect, getUpdateProductHTML);
router.route('/:id').get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;