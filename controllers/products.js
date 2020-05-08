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

exports.createProduct = (req, res, next) => {
    res.status(201).json({
        success: true,
        message: 'Kreiran proizvod'
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