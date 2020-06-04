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
    
    // poziva fju za pretvaranje Decimal128 u String jer smo u routes pre ove fje
    // pozvali middleware advancedResults
    //res.advancedResults.data = decimal128ToStringOutput(res.advancedResults.data);
    
    res.status(200).json(res.advancedResults);    
    // res.status(200).json({
    //     success: true,
    //     count: newProducts.length,
    //     pagination,
    //     data: newProducts
    // });    
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
        runValidators: true,
        context: 'query'
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