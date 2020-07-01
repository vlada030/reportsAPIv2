const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const formidableMiddleware = require('express-formidable');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

//import custom error handlera
const errorHandler = require('./middleware/errorHandler');
// import MONGO konekcije 
const connectDB = require('./config/db');
// import routa
const reports = require('./routes/reports');
//const products = require('./routes/products');
//const users = require('./routes/auth');
//const userHTML = require('./routes/userHTML');
// import 404 controlera
const pageNotFound = require('./controllers/404');

// ENV fajl nije u root folderu zato mora da se navede putanja
dotenv.config({
    path: "./config/config.env"
});

// pozivanje konekcije nakon .env, a pre app
connectDB();

// kreiranje aplikacije
const app = express();

// setovanje template engine - pug
app.set('view engine', 'pug');
// opciono - po defaultu pug fajlovi su u views, ovo je višak 
app.set('views', 'views');

// pozivanje defaultnog body parsera za dobijanje req.body
// ako je req.body u vidu objects ili arrays
app.use(express.urlencoded({extended: false}));
// ako je req.body JSON format
//app.use(express.json());

// kada se podaci salju preko formData, formData automatski setuje 'content-type': 'multipart/form-data' koji bodyparser iznad ne moze da iscita
// formidable moze da iscita i json type tako da body parser ne treba
//app.use(formidableMiddleware());

// pozivanje cookie parsera da bi u cookie mogao sa se ubaci token
app.use(cookieParser());


// pozivanje morgan loggera
if (process.env.NODE_ENV = 'development') {
    app.use(morgan('dev'));
}

// Mongo sanitize - No-SQL injection
app.use(mongoSanitize());

// CORS
app.use(cors());

// pravljenje static foldera
app.use(express.static(path.join(__dirname, 'public')));

// postavljanje routa
app.use('/api/v2/reports', reports);
//app.use('/api/v1/products', products);
//app.use('/api/v1/auth', users);
//app.use('/api/v1/users', userHTML);
// ukoliko strana ne postoji
app.use(pageNotFound);

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