const mongoose = require('mongoose');
// moze i ovde da se kreira try/catch u slucaju greske, ali bolje je u glavnom fajlu
// gde se poziva konekcija jer ce to ujedno da bude i globalni handler za Unhandled Rejection!
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // ovo se ubacuje da nam nebi u konzoli izbacivalo upozorenja
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.brightBlue);
}
//     // moze i ovako
//     await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });

//     console.log(`MongoDB Connected: ${mongoose.connection.host}`.brightBlue);
// }

module.exports = connectDB;