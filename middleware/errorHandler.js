// expressov default error handler prilikom greske izbacuje html gde stoji greska i status 500
// zato pravimo custom error middleware, na sajtu ima kako se pravi

const errorHandler = (err, req, res, next) => {
    //console.log(`${err}`.bgGreen);
    console.log(err.stack.red);
    // console.log(err.message.bgCyan);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server Error"
    });
};

module.exports = errorHandler;