const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc   Get all products
// @route  GET /api/v1/products
// @access Private

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        products.forEach(product => {product.otpor = product.otpor.toString()});
        
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        }); 
    } catch (err) {
        res.status(500).json({success: false});
    }
    
};


// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access Private

exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
        // id ostane isti zbacuje success: true, DATA: NULL
        if (!product) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({
            success: true,
            data: product
    });
    } catch (err) {
       console.log(err);
       res.status(400).json({success: false}); 
    }
    
};


// @desc   Create product
// @route  POST /api/v1/products
// @access Private

exports.createProduct = async (req, res, next) => {
    try {
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
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: `${err}`});
    }
    
};

// @desc   Update product
// @route  PUT /api/v1/products/:id
// @access Private

exports.updateProduct = async (req, res, next) => {

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: false
        });

        if (!product) {
            return res.status(400).json({success: false, msg: "sifra 7 karaktera"});
        }
    
        res.status(200).json({
            success: true,
            data: product
        }); 
    } catch (err) {
        console.log(err);
        res.status(400).json({success: false});
    }
    
};

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({success: false});
    }
    
};