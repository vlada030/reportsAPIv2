const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const MongoDbSessionStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
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

// import error page (page not found ili neka druga greška) controlera
const pageNotFound = require('./controllers/errorPageController');

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
app.set('views', path.join(__dirname, 'views'));

// pozivanje morgan loggera
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:5000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER"
//     );
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
//     );
//     next();
// });

// pozivanje defaultnog body parsera za dobijanje req.body
// ako je req.body u vidu strings/arrays (extended: false) ili bilo sta (extended: true)- form-urlencoded

app.use(express.urlencoded({extended: false}));
// ako je req.body JSON format
app.use(express.json());

// kada se podaci salju preko formData, formData automatski setuje 'content-type': 'multipart/form-data' koji bodyparser iznad ne moze da iscita
// formidable moze da iscita i json type tako da body parser ne treba
//app.use(formidableMiddleware());

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
        store: storeSession
    })
);

// dodatno setovanje security headera
// disable content Security Policy jer mi blokira bootstrap...
app.use(helmet({
    contentSecurityPolicy: false,
}));

// pokusaj konfigurisanja helmeta za pokretanje dozvoljenih skripti - NE RADI ZA FONTAWESOME 
// app.use(helmet({

//     contentSecurityPolicy: {
//         directives:{
//             defaultSrc:["'self'"],
//             scriptSrc:["'self'", 'https://code.jquery.com/jquery-3.5.1.slim.min.js', 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', 'https://kit.fontawesome.com/52005eadbf.js'],
//             styleSrc:["'self'", 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'],
//             fontSrc:["'self'"]}
//     }
//     }));

// nakon pozivanje session poziva se csrf zastita jer je konfigurisana preko session
app.use(csurfProtection);
// poziva se pre routa, a posle csrf pozivanja
app.use(csrfLocalsVariable);

// pozivanje flash messages
app.use(flash());

// Mongo sanitize - No-SQL injection
app.use(mongoSanitize());

// prevencija XSS - input sadrzi script tag ili html koji se kasnije prilikom prikazivanja moze ucitati u stranu, pre routa se poziva
app.use(xss());

// ogranicavanje broja requesta serveru
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
//app.set('trust proxy', 1);
 
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 400 // limit each IP to 100 requests per windowMs
  });
   
//  apply to all requests
app.use(limiter);

// spreci HPP (http parameter polution)
app.use(hpp());

// CORS
//app.use(cors());
app.use(cors({
    // zbog axiosa corsu mora da se doda credentials
    //origin: ['http://localhost:5000', 'http://127.0.0.1:5000','https://localhost:5000', 'https://127.0.0.1:5000'],
    // origin: true,
    // methods: ['GET', 'PUT'],     
    // credentials: true
}));

// pravljenje static foldera
app.use(express.static(path.join(__dirname, 'public')));

// postavljanje routa
app.use('/api/v2/reports', reportsRoute);
app.use('/api/v2/products', productsRoute);
app.use('/api/v2/auth', authRoute);
app.use('/api/v2/users', usersRoute);

// posto nema landing page, ovo je ubačeno da preusmeri na postojeću route
app.use('', (req, res) => {res.redirect('/api/v2/reports/dom')});

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