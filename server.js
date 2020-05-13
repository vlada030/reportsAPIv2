const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

//import custom error handlera
const errorHandler = require('./middleware/errorHandler');
// import MONGO konekcije 
const connectDB = require('./config/db');
// import routa
const products = require('./routes/products');

// ENV fajl nije u root folderu zato mora da se navede putanja
dotenv.config({
    path: "./config/config.env"
});

// pozivanje konekcije nakon .env, a pre app
connectDB();

// kreiranje aplikacije
const app = express();

// pozivanje defaultnog body parsera
app.use(express.json());

// pozivanje morgan loggera
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

// postavljanje routa
app.use('/api/v1/products', products);
// pozivanje custom errorHandlera koji se inicijalizira preko next iz controllera
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightYellow));

// ovde prenosimo resavanje mongodb greske
// pogresna sifra - promise tj node vraca gresku unhandled rejection
// u slucaju da ne mozemo da ostvarimo konekciju,
// ugasi server i izadji iz node aplikacije (process) sa greskom   
process.on('unhandledRejection', (err, promise) =>{
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
