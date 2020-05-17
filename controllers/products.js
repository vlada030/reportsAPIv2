const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');

// @desc   Get all products
// @route  GET /api/v1/products
// @access Private

// exports.getProducts = async (req, res, next) => {
//     try {
//         const products = await Product.find();

//         // poziva fju za pretvaranje Decimal128 u String
//         const newProducts = decimal128ToStringOutput(products);
        
//         res.status(200).json({
//             success: true,
//             count: newProducts.length,
//             data: newProducts
//         }); 
//     } catch (err) {
//         next(err);
//     }  
// };

// umesto try/catch koristimo wrapper fju asyncHandler 
exports.getProducts = asyncHandler(async (req, res, next) => {

    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

    console.log(JSON.parse(queryStr));
    const products = await Product.find(JSON.parse(queryStr));

    // poziva fju za pretvaranje Decimal128 u String
    const newProducts = decimal128ToStringOutput(products);
    
    res.status(200).json({
        success: true,
        count: newProducts.length,
        data: newProducts
    });    
});


// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access Private

exports.getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.find({sifra: req.params.id});
    
    // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
    // id ostane isti izbacuje success: true, DATA: NULL
    // vazi i za ObjectId i za npr {sifra: 777}
    if (product.length !== 1) {
        // return res.status(400).json({success: false});
        
        //throw new Error('Invalid id for sifra');

        return next(new ErrorResponse(`Product with id ${req.params.id} not found`, 404)); 
    }
    
    
    // poziva fju za pretvaranje Decimal128 u String
    const newProduct = decimal128ToStringOutput(product);

    res.status(200).json({
        success: true,
        data: newProduct
    }); 
});


// @desc   Create product
// @route  POST /api/v1/products
// @access Private

exports.createProduct = asyncHandler(
    async (req, res, next) => {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
}); 

// @desc   Update product
// @route  PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {    
    const product = await Product.findOneAndUpdate({sifra: req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
    // id ostane isti izbacuje success: true, DATA: NULL
    // vazi i za ObjectId i za npr {sifra: 777}
    if (!product) {
        return next(new ErrorResponse(`Product with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: product
    });     
});

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findOneAndDelete({sifra: req.params.id});

    if (!product) {
        return next(new ErrorResponse(`Product with id ${req.params.id} not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: {}
    });   
    
});

// helper fja za prebacivanje Decimal128 u String

const decimal128ToStringOutput = (arrOfProducts) => {
    return arrOfProducts.map( product => {
        return {
            _id: product._id,
            sifra: product.sifra,
            debPPS1: product.debPPS1,
            debPPS2: product.debPPS2,
            parcijalna: product.parcijalna,
            proizvod: product.proizvod,
            napon: product.napon,
            boja: product.boja,
            propis: product.propis,
            brojZica: product.brojZica,
            precnikZice: product.precnikZice.toString(),
            otpor: product.otpor.toString(),
            debIzolacije: product.debIzolacije.toString(),
            debPlasta: product.debPlasta.toString(),
            spPrecnik: product.spPrecnik.toString(),
            ispitniNapon: product.ispitniNapon,
            createdAt: product.createdAt.toUTCString()
        };
        
    });
};