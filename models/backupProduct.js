const mongoose = require('mongoose');

// validator fja mora preko function da bi radilo this
const productCodeLength = function() {
    return this.sifra.toString().length == 7;
};

// ZA DECIMAL128 NE RADE BUILTIN VALIDATORI MIN / MAX ZATO MORA CUSTOM
// validacija precnika zice
const minlimitValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('0.2');
    return +this.precnikZice >= min;
};

const maxlimitValidation = function() {
    const max = mongoose.Types.Decimal128.fromString('3.6');
    return +this.precnikZice <= max;
};

const manyValidators = [
    { validator: minlimitValidation, msg: 'Najmanji prečnik jedne žice je 0.2' },
    { validator: maxlimitValidation, msg: 'Najveći prečnik jedne žice je 3.6' }

];

// validacija otpora
const resistanceValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('0.01');
    const max = mongoose.Types.Decimal128.fromString('24');
    return (+this.otpor >= min && +this.otpor <= max);
};

// validacija debljine izolacije
const insulationValidation = function() {
    const max = mongoose.Types.Decimal128.fromString('9');
    return +this.debIzolacije <= max;
};

// validacija debljine plašta
const sheathValidation = function() {
    // const min = mongoose.Types.Decimal128.fromString('0.3');
    const max = mongoose.Types.Decimal128.fromString('4');
    return +this.debPlasta <= max;
};

// validacija spoljnog prečnika
const outdiametarValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('2');
    const max = mongoose.Types.Decimal128.fromString('70');
    return (+this.spPrecnik >= min && +this.spPrecnik <= max);
};

const ProductSchema = new mongoose.Schema({
    sifra: {
        type: Number,
        required: [true, 'Please add a product code'],
        validate: { validator: productCodeLength, msg:'Sifra mora da sadrzi 7 broja'},
        //validate: [function() {return this.sifra.toString().length == 7}, 'Sifra mora da sadrzi 7 broja'],
        unique: true        
    },

    proizvod: {
        type: String,
        required: [true, 'Unesite naziv proizvoda'],
        trim: true,
        minlength: [2, 'Najkraći naziv proizvoda je 2 karaktera'],
        maxlength: [45, 'Najduži naziv proizvoda je 45 karaktera']
    },

    napon: {
        type: String,
        required: [true, 'Please add a rated voltage'],
        enum: ['100V','300/300V', '300/500V', '380V', '450/750V', '0.6/1kV', '3.6/6kV', '6/10kV', '12/20kV','18/30kV', '20/35kV', 'N/A']
    },

    boja: {
        type: String,
        required: [true, 'Please add a product color'],
        enum: ['CRNA', 'SIVA', 'BELA', 'CRVENA', 'NARANDŽASTA','ŽUTA', 'ZELENA', 'ŽUTO-ZELENA', 'PLAVA','BRAON', 'N/A', 'BEZBOJNA'],
        uppercase: true        
    },

    propis: {
        type: String,
        required: [true, 'Unesite standard za izradu proizvoda.'],
        trim: true,
        maxlength: [40, 'Najduže ime za standard je 40 karaktera'],
        uppercase: true
    },

    brojZica: {
        type: Number,
        required: [true, 'Unesi ukupan broj komponenti žica'],
        min: [1, 'Najmanji broj komponenti je 1 žica'],
        max: [2500, 'Najve broj komponenti je 2500 žica']
    },

    precnikZice: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi prečnik jedne žice'],
        validate: manyValidators
        // min: [0.2, 'Najmanji prečnik jedne žice je 0.2'],
        // max: [3.6, 'Najveći prečnik jedne žice je 3.6']
    },
    otpor: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi otpor provodnika'],
        validate: {
            validator:resistanceValidation,
            msg: 'Vrednost otpora mora da bude u granicama 0.01 - 24'
        }
    },

    debIzolacije: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi debljinu izolacije'],
        validate: [insulationValidation, 'Debljina izolacije mora da bude manja od 9']
    },

    debPPS1: {
        type: String,
        trim: true,
        default: "/"
    },

    debPPS2: {
        type: String,
        trim: true,
        default: "/"
    },

    debPlasta: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi debljinu plašta.'],
        validate: {
            validator: sheathValidation, msg:'Debljina plašta mora da bude manja od 4'
        }       
    },

    spPrecnik: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi spoljnji prečnik kabla'],
        validate: [outdiametarValidation, 'Spoljnji prečnik mora da bude u granicama 2 - 70' ]
    },

    ispitniNapon: {
        type: Number,
        required: [true, 'Please add a test voltage'],
        enum: [0, 2, 2.5, 3, 3.5, 4, 15, 21, 30, 42, 50, 83.2]
    },

    parcijalna: {
        type: String,
        trim: true,
        default: "/"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);