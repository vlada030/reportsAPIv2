const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc   Get all products
// @route  GET /api/v1/products
// @access Private

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Ucitani su svi proizvodi`
    });
};


// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access Private

exports.getProduct = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Ucitan proizvod ${req.params.id}`
    });
};


// @desc   Create product
// @route  POST /api/v1/products
// @access Private

exports.createProduct = async (req, res, next) => {
    // const modifiedProduct = {
    //     sifra: req.body.sifra,
    //     proizvod: req.body.proizvod,
    //     napon: req.body.napon,
    //     boja: req.body.boja,
    //     propis: req.body.propis,
    //     brojZica: req.body.brojZica,
    //     precnikZice: mongoose.Types.Decimal128.fromString(req.body.precnikZice),
    //     otpor: mongoose.Types.Decimal128.fromString(req.body.otpor),
    //     debIzolacije: mongoose.Types.Decimal128.fromString(req.body.debIzolacije),
    //     debPlasta: mongoose.Types.Decimal128.fromString(req.body.debPlasta),
    //     spPrecnik: mongoose.Types.Decimal128.fromString(req.body.spPrecnik),
    //     ispitniNapon: req.body.ispitniNapon
    // };

    // const product = await Product.create(modifiedProduct);
    req.body.precnikZice = mongoose.Types.Decimal128.fromString(req.body.precnikZice);
    req.body.otpor = mongoose.Types.Decimal128.fromString(req.body.otpor);
    req.body.debIzolacije = mongoose.Types.Decimal128.fromString(req.body.debIzolacije);
    req.body.debPlasta = mongoose.Types.Decimal128.fromString(req.body.debPlasta);
    req.body.spPrecnik = mongoose.Types.Decimal128.fromString(req.body.spPrecnik);
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        data: product
    });
};


// @desc   Update product
// @route  PUT /api/v1/products/:id
// @access Private

exports.updateProduct = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Updejtovan proizvod ${req.params.id}`
    });
};

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `Obrisan proizvod ${req.params.id}`
    });
};