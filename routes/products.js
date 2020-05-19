const express = require('express');
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/products');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

const router = express.Router();

router.route('/').get(advancedResults(Product), getProducts).post(createProduct);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;