const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// import routa
const products = require('./routes/products');

// ENV fajl nije u root folderu zato mora da se navede putanja
dotenv.config({
    path: "./config/config.env"
});

// kreiranje aplikacije
const app = express();

// postavljanje routa
app.use('/api/v1/products', products);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightYellow));