const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// import routa
const products = require('./routes/products');

// ENV fajl nije u root folderu zato mora da se navede putanja
dotenv.config({
    path: "./config/config.env"
});

// kreiranje aplikacije
const app = express();

// pozivanje morgan loggera
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

// postavljanje routa
app.use('/api/v1/products', products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightYellow));