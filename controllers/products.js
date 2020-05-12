const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc   Get all products
// @route  GET /api/v1/products
// @access Private

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        const newProducts = products.map( product => {
            product.precnikZice = mongoose.Types.Decimal128.toString(product.precnikZice);
            product.otpor = product.otpor.toString();
            product.debIzolacije = product.debIzolacije.toString();
            product.debPlasta = product.debPlasta.toString();
            product.spPrecnik = product.spPrecnik.toString();
            return product;
        });
        
        res.status(200).json({
            success: true,
            count: newProducts.length,
            data: newProducts
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
        const product = await Product.find({sifra: req.params.id}, (err, doc) => {
            
            //console.log(doc[0].precnikZice);
            //return doc[0].precnikZice = mongoose.Types.Decimal128.toString(doc[0].precnikZice);
            //return doc[0].precnikZice = parseFloat(doc[0].precnikZice);
        });
        
        // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
        // id ostane isti zbacuje success: true, DATA: NULL
        // vazi i za ObjectId i za npr {sifra: 777}
        if (!product) {
            return res.status(400).json({success: false});
        }
        console.log(product[0].precnikZice);
        product[0].precnikZice = mongoose.Types.Decimal128.toString(product[0].precnikZice);
        console.log(product[0].precnikZice);
        // product.otpor = product.otpor.toString();
        // product.debIzolacije = product.debIzolacije.toString();
        // product.debPlasta = product.debPlasta.toString();
        // product.spPrecnik = product.spPrecnik.toString();

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
        // req.body.precnikZice = mongoose.Types.Decimal128.fromString(req.body.precnikZice);
        // req.body.otpor = mongoose.Types.Decimal128.fromString(req.body.otpor);
        // req.body.debIzolacije = mongoose.Types.Decimal128.fromString(req.body.debIzolacije);
        // req.body.debPlasta = mongoose.Types.Decimal128.fromString(req.body.debPlasta);
        // req.body.spPrecnik = mongoose.Types.Decimal128.fromString(req.body.spPrecnik);
        
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
        const product = await Product.findOneAndUpdate({sifra: req.params.id}, req.body, {
            new: true,
            runValidators: true
        });
        // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
        // id ostane isti izbacuje success: true, DATA: NULL
        // vazi i za ObjectId i za npr {sifra: 777}
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
        const product = await Product.findOneAndDelete({sifra: req.params.id});

        if (!product) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(400).json({success: false});
    }
    
};