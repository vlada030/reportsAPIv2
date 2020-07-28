const mongoose = require('mongoose');

const ExpReportSchema = new mongoose.Schema({
    rb: {
        type: Number,
        required: [true, 'Unesite redni broj izveštaja']
    },
    
    sifra: {
        type: Number,
        required: [true, 'Unesite sifru proizvoda'],
        // validate: [lengthValidation(this.sifra, 7), 'Sifra mora da sadrzi 7 broja'] 
        validate: [function() {
            return this.sifra.toString().length === 7;
        } , 'Sifra mora da sadrzi 7 broja'] 
    },

    godina: {
        type: Number,
        required: [true, 'Unesite godinu proizvodnje kabla npr. 2020'],
        validate: [function() {
            return this.godina.toString().length === 4;
        } , 'Godina proizvodnje mora da sadrzi 4 broja']
    },

    stavka: [{
        dobos: {
            type: String,
            required: [true, 'Unesite broj na stranici doboša'],
            validate: [function() {
                return this.dobos.length === 10;
            } , 'Oznaka doboša mora da sadrzi 10 znaka']
        },

        duzina: {
            type: Number,
            required: [true, 'Unesite dužinu kabla'],
            min: [1, 'Najmanja dužina koju možete uneti je 1m'],
            max: [12000, 'Najveća dužina koju možete uneti je 12km']
        }  
    }],

    ukupnaDuz: {
        type: Number,
        required: true
    },

    createdByUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true
});

module.exports = mongoose.model('ExpReport', ExpReportSchema);