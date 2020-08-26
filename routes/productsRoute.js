const express = require('express');
const { body } = require('express-validator');

const {getProducts, getProduct, getProductJSON, getCreateProductHTML, getUpdateProductHTML, getAllProductsHTML, createProduct, updateProduct, deleteProduct} = require('../controllers/productsController');
const advancedResults = require('../middleware/advancedResults');
const Product = require('../models/Product');

// dodavanje middleware fja
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(advancedResults(Product), getProducts);
router
    .route("/create")
    .get(protect, getCreateProductHTML)
    .post(
        protect,
        [
            body("sifra")
                .isNumeric()
                .isLength({ min: 7, max: 7 })
                .withMessage('Šifra proizvoda mora da sadrži 7 broja')
                .custom(async (value) => {
                    const product = await Product.findOne({ sifra: value });

                    if (product) {
                        throw new Error(
                            "Proizvod sa ovom šifrom postoji, unesite drugu šifru"
                        );
                    }
                    return true;
                })
                .trim(),
            body("proizvod", 'Naziv proizvoda sadrži od 2 do 45 slova/broja')
                .isAlphanumeric()
                .isLength({ min: 2, max: 45 })
                .trim(),
            body("propis", 'Naziv standarda sadrži najviše 40 slova/broja')
                .isAlphanumeric()
                .isLength({ min: 1, max: 40 })
                .trim(),
            body("brojZica", 'Broj žica provodnika je u intervalu 1 - 2500')
                .isNumeric()
                .isInt({ gt: 1, lt: 2500 })
                .trim(),
        ],
        createProduct
    );
router.route('/update').get(protect, getUpdateProductHTML);
router.route('/allProducts').get(protect, getAllProductsHTML);
router.route('/:id').get(protect, getProduct).put(protect, updateProduct).delete(protect, deleteProduct);
router.route('/:id/json').get(protect, getProductJSON);

module.exports = router;