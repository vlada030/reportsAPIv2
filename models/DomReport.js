const mongoose = require('mongoose');

const DomReportSchema = new mongoose.Schema({
    rb: {
        type: Number,
        required: [true, 'Unesite redni broj izveštaja']
    },
    
    MISBroj: {
        type: Number,
        unique: true,
        required: [true, 'Unesite MIS broj doboša'],
        // validate: [lengthValidation(this.MISBroj, 7), 'MIS broj mora da sadrzi 8 broja'] 
        validate: [function() {
            return this.MISBroj.toString().length === 7;
        } , 'MIS broj mora da sadrzi 7 broja'] 
    },

    sifra: {
        type: Number,
        required: [true, 'Unesite sifru proizvoda'],
        // validate: [lengthValidation(this.sifra, 7), 'Sifra mora da sadrzi 7 broja'] 
        validate: [function() {
            return this.sifra.toString().length === 7;
        } , 'Sifra mora da sadrzi 7 broja'] 
    },

    radniNalog: {
        type: Number,
        required: [true, 'Unesite radni nalog proizvoda'],
        // validate: [lengthValidation(this.radniNalog, 8), 'Radni nalog mora da sadrzi 8 broja'] 
        validate: [function() {
            return this.radniNalog.toString().length === 8;
        } , 'Radni Nalog mora da sadrzi 8 broja']      
    },

    velDob: {
        type: String
    },

    duzina: {
        type: Number,
        required: true,
        min: 1,
        max: 3000
    },

    bruto: {
        type: Number,
        required: true,
        min: 1,
        max: 6000
    },

    neto: {
        type: Number,
        required: true,
        min: 1,
        max: 5000
    },

    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
});

module.exports = mongoose.model('DomReport', DomReportSchema);