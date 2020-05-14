// expressov default error handler prilikom greske izbacuje html gde stoji greska i status 500
// zato pravimo custom error middleware, obavezno sadrzi err pored req...

// da bi u controlleru imali samo next(err) ovde ubacujemo prosirenu klasu ErrorResponse
// sa mogucim greskama
const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {

    let error = {...err};
    
    // kada iz controllera posaljemo ErrorResponse message mora ova linija da bi se videla
    error.message = err.message;
    // console.log(err.stack.red);
    // console.log(err.message.bgCyan);
    // console.log(err);

    // CastError vraca za sve CRUD operacije u try/catch
    // kada unesemo los id..
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
};

module.exports = errorHandler;