const mongoose = require('mongoose');
// validator fja mora preko function da bi radilo this
const validator = function() {
    return this.sifra.toString().length == 7;
};

const ProductSchema = new mongoose.Schema({
    sifra: {
        type: Number,
        required: [true, 'Please add a product code'],
        validate: [validator, 'Sifra mora da sadrzi 7 broja'],
        //validate: [function() {return this.sifra.toString().length == 7}, 'Sifra mora da sadrzi 7 broja'],
        unique: true        
    },

    proizvod: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
        maxlength: [30, 'Name can not be more than 50 characters'],
        unique: true
    },

    napon: {
        type: String,
        required: [true, 'Please add a rated voltage'],
        enum: ['300/300V', '300/500V', '450/750V', '0.6/1kV', '3.6/6kV', '6/10kV', '12/20kV', '20/35kV']
    },

    boja: {
        type: String,
        required: [true, 'Please add a product color'],
        enum: ['CRNA', 'SIVA', 'BELA', 'CRVENA', 'NARANDZASTA', 'NARANDŽASTA'],
        uppercase: true
        
    },

    propis: {
        type: String,
        required: [true, 'Please add a product standard'],
        trim: true,
        maxlength: [20, 'Max length for standard name is 20 characters'],
        uppercase: true
    },

    brojZica: {
        type: Number,
        required: [true, 'Please add a number of component wires'],
        min: [1, 'Min number of component wires is 1'],
        max: [60, 'Max number of component wires is 60']
    },

    precnikZice: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add a diametar of component wires'],
        min: [0.2, 'Min diametar of component wire is 0.2'],
        max: [3.6, 'Max diametar of component wire is 3.6']
    },

    otpor: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add a resistance'],
        min: [0.1, 'Min resistance is 0.1'],
        max: [24, 'Max resistance is 24']
    },

    debIzolacije: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add a insulation thickness'],
        min: [0.4, 'Min insulation thickness is 0.4'],
        max: [9, 'Max insulation thickness is 9']
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
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add a sheath thickness'],
        min: [0.4, 'Min sheath thickness is 0.4'],
        max: [4, 'Max sheath thickness is 4']
    },

    spPrecnik: {
        type: mongoose.Types.Decimal128,
        required: [true, 'Please add a overall diametar'],
        min: [2, 'Min insulation thickness is 2'],
        max: [70, 'Max insulation thickness is 70']
    },

    ispitniNapon: {
        type: String,
        required: [true, 'Please add a test voltage'],
        enum: ['2kV', '3kV', '3.5kV', '4kV', '15kV', '21kV', '30kV', '42kV', '50kV', '83.2kV']
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