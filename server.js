const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDbSessionStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const formidableMiddleware = require('express-formidable');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

//import custom error handlera
const errorHandler = require('./middleware/errorHandler');
// import csrf middleware za dodavalje locals promenjive
const csrfLocalsVariable = require('./middleware/csrfLocals');
// import MONGO konekcije 
const connectDB = require('./config/db');

// import routa
const reportsRoute = require('./routes/reportsRoute');
const productsRoute = require('./routes/productsRoute');
const authRoute = require('./routes/authRoute');
const usersRoute = require('./routes/usersRoute');

// import 404 controlera
const pageNotFound = require('./controllers/404Controller');

// ENV fajl nije u root folderu zato mora da se navede putanja
dotenv.config({
    path: "./config/config.env"
});

// konfiguracija csurf zastite, ovim se dodaje svakom req.csrf
const csurfProtection = csrf();

// pozivanje konekcije nakon .env, a pre app
connectDB();

// kreiranje aplikacije
const app = express();

// setovanje template engine - pug
app.set('view engine', 'pug');
// opciono - po defaultu pug fajlovi su u views, ovo je višak 
app.set('views', 'views');

// pozivanje defaultnog body parsera za dobijanje req.body
// ako je req.body u vidu objects ili arrays - form-urlencoded
app.use(express.urlencoded({extended: false}));
// ako je req.body JSON format
app.use(express.json());

// kada se podaci salju preko formData, formData automatski setuje 'content-type': 'multipart/form-data' koji bodyparser iznad ne moze da iscita
// formidable moze da iscita i json type tako da body parser ne treba
//app.use(formidableMiddleware());

// pozivanje cookie parsera da bi u cookie mogao sa se ubaci token
//app.use(cookieParser());

// da se nebi opetercivala memorija noda, snimanje session u MongoDb
const storeSession = new MongoDbSessionStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
});

// umesto cookie jos bolje je koristiti session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {},
        store: storeSession,
    })
);

// nakon pozivanje session poziva se csrf zastita jer je konfigurisana preko session
app.use(csurfProtection);

// poziva se pre routa, a posle csrf pozovanja
app.use(csrfLocalsVariable);

// pozivanje morgan loggera
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mongo sanitize - No-SQL injection
app.use(mongoSanitize());

// CORS
app.use(cors());

// pravljenje static foldera
app.use(express.static(path.join(__dirname, 'public')));

// postavljanje routa
app.use('/api/v2/reports', reportsRoute);
app.use('/api/v2/products', productsRoute);
app.use('/api/v2/auth', authRoute);
app.use('/api/v2/users', usersRoute);

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