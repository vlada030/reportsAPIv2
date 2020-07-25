const express = require('express');
const {getProducts, getProduct, getCreateProductHTML, getUpdateProductHTML, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// dodavanje middleware fja
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(advancedResults(Product), getProducts).post(protect, createProduct);
router.route('/create').get(getCreateProductHTML);
router.route('/update').get(getUpdateProductHTML);
router.route('/:id').get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct);

module.exports = router;