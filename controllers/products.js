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
    let query;

    let reqQuery = {...req.query};

    // izbacujemo iz req.query reci koje nisu polja u Mongo
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach( field => delete reqQuery[field]);

    // Mongo u find prihvata objekat koji je slican req.query tj
    // specijalnim recima gt, lt nedostaje $ da bi bili identicni
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, match => `$${match}`);

    query = Product.find(JSON.parse(queryStr));

    // ukoliko postoji select filter u req.query, u mongoose on se dodaje sa razmacima
    // izmedju imena polja 
    if (req.query.select) {
        // const selQuery = req.query.select.replace(/,/g, ' ' );
        const selQuery = req.query.select.split(',').join(' ');
        query = query.select(selQuery);
    }

    // ukoliko postoji sort filter u req.query,ako ne defaultno je po datumu kreiranja
    if (req.query.sort) {
        query = query.sort(req.query.sort);
    } else {
        query = query.sort('-createdAt');
    }

    // Dodavanje paginacije
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // ukupan broj dokumenata
    const total = await Product.countDocuments();

    query = query.skip(startIndex).limit(limit);

    const products = await query;
    
    // poziva fju za pretvaranje Decimal128 u String
    const newProducts = decimal128ToStringOutput(products);
    
    // prilagodjavanje responsa za lakse povezivanje sa front-endom
    // vraca u res da li ima prev/next strana
    let pagination = {};

    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit 
        };
    }

    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        };
    }

    res.status(200).json({
        success: true,
        count: newProducts.length,
        pagination,
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
    let product = await Product.findOne({sifra: req.params.id});

    // u slucaju da u ObjectId promenimo jedno slovo, a ukupan broj/format
    // id ostane isti izbacuje success: true, DATA: NULL
    // vazi i za ObjectId i za npr {sifra: 777}
    if (!product) {
        return next(new ErrorResponse(`Product with id ${req.params.id} not found`, 404));
    }

    product = await Product.findOneAndUpdate({sifra: req.params.id}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: product
    });     
});

// @desc   Delete product
// @route  DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findOne({sifra: req.params.id});

    if (!product) {
        return next(new ErrorResponse(`Product with id ${req.params.id} not found`, 404));
    }

    await Product.remove({sifra: req.params.id});

    res.status(200).json({
        success: true,
        data: {}
    });   
    
});

// helper fja za prebacivanje Decimal128 u String

const decimal128ToStringOutput = (arrOfProducts) => {
    return arrOfProducts.map( product => {
        try {
            let precnikZice = void 0;
            let otpor = void 0;
            let debIzolacije = void 0;
            let debPlasta = void 0;
            let spPrecnik = void 0;
            let createdAt = void 0;

            if (product.precnikZice) {
                precnikZice =  product.precnikZice.toString();
            } 

            if (product.otpor) {
                otpor =  product.otpor.toString();
            } 
            if (product.debIzolacije) {
                debIzolacije =  product.debIzolacije.toString();
            } 
            if (product.debPlasta) {
                debPlasta =  product.debPlasta.toString();
            } 
            if (product.spPrecnik) {
                spPrecnik =  product.spPrecnik.toString();
            } 
            if (product.createdAt) {
                createdAt =  product.createdAt.toUTCString();
            } 

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
                precnikZice: precnikZice,
                otpor: otpor,
                debIzolacije: debIzolacije,
                debPlasta: debPlasta,
                spPrecnik: spPrecnik,
                ispitniNapon: product.ispitniNapon,
                createdAt: createdAt
            };

        } catch (error) {
            throw new ErrorResponse('Greska u konverziji, funkcija decimal128ToStringOutput(), product controller', 500);
        }        
        
    });
};