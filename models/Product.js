const mongoose = require('mongoose');

// validator fja mora preko function da bi radilo this
const productCodeLength = function() {
    return this.sifra.toString().length == 7;
};

// ZA DECIMAL128 NE RADE BUILTIN VALIDATORI MIN / MAX ZATO MORA CUSTOM
// CAKA - ispred this se stavlja + da pretvori u broj inace poredi stringove!!!
// validacija precnika zice
// ovo vazi kad samo hoćemo da uradimo findOneAndUpdate jer this setuje na Query, neće za create
// const minlimitValidation = function() {
//     const min = mongoose.Types.Decimal128.fromString('0.2');
//     console.log(this.getUpdate().$set.precnikZice instanceof String);
//     console.log(this.getUpdate().$set.precnikZice);
//     return +this.getUpdate().$set.precnikZice >= min;
// };

const minlimitValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('0.2');
    // sa ovim dodatkom radi i update,
    const precnik = this.precnikZice || this.getUpdate().$set.precnikZice;
    return +precnik >= min;
};

const maxlimitValidation = function() {
    const max = mongoose.Types.Decimal128.fromString('3.6');
    const precnik = this.precnikZice || this.getUpdate().$set.precnikZice;
    return +precnik <= max;
};

const manyValidators = [
    { validator: minlimitValidation, msg: 'Najmanji prečnik jedne žice je 0.2' },
    { validator: maxlimitValidation, msg: 'Najveći prečnik jedne žice je 3.6' }

];

// validacija otpora
const resistanceValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('0.01');
    const max = mongoose.Types.Decimal128.fromString('24');
    const otpor = this.otpor || this.getUpdate().$set.otpor;
    return (+otpor >= min && +otpor <= max);
};

// validacija debljine izolacije
const insulationValidation = function() {
    const max = mongoose.Types.Decimal128.fromString('9');
    const debIzol = this.debIzolacije || this.getUpdate().$set.debIzolacije;
    return +debIzol <= max;
};

// validacija debljine plašta
const sheathValidation = function() {
    // const min = mongoose.Types.Decimal128.fromString('0.3');
    const max = mongoose.Types.Decimal128.fromString('4');
    const debPl = this.debPlasta || this.getUpdate().$set.debPlasta;
    return +debPl <= max;
};

// validacija spoljnog prečnika
const outdiametarValidation = function() {
    const min = mongoose.Types.Decimal128.fromString('2');
    const max = mongoose.Types.Decimal128.fromString('70');
    const spPrecnik = this.spPrecnik || this.getUpdate().$set.spPrecnik;
    return (spPrecnik >= min && spPrecnik <= max);
};

const ProductSchema = new mongoose.Schema({
    sifra: {
        type: Number,
        required: [true, 'Please add a product code'],
        validate: { validator: productCodeLength, msg:'Sifra mora da sadrzi 7 broja'},
        //validate: [function() {return this.sifra.toString().length == 7}, 'Sifra mora da sadrzi 7 broja'],
        unique: true        
    },

    // proizvod: {
    //     type: String,
    //     required: [true, 'Please add a product name'],
    //     trim: true,
    //     minlength: [2, 'Name can not be less than 2 characters'],
    //     maxlength: [45, 'Name can not be more than 45 characters']
    // },
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

    // propis: {
    //     type: String,
    //     required: [true, 'Please add a product standard'],
    //     trim: true,
    //     maxlength: [40, 'Max length for standard name is 40 characters'],
    //     uppercase: true
    // },
    propis: {
        type: String,
        required: [true, 'Unesite standard za izradu proizvoda.'],
        trim: true,
        maxlength: [40, 'Najduže ime za standard je 40 karaktera'],
        uppercase: true
    },

    // brojZica: {
    //     type: Number,
    //     required: [true, 'Please add a number of component wires'],
    //     min: [1, 'Min number of component wires is 1']
    //     max: [2500, 'Max number of component wires is 2500']
    // },
    brojZica: {
        type: Number,
        required: [true, 'Unesi ukupan broj komponenti žica'],
        min: [1, 'Najmanji broj komponenti je 1 žica'],
        max: [2500, 'Najveći broj komponenti je 2500 žica']
    },

    // precnikZice: {
    //     type: mongoose.Types.Decimal128,
    //     required: [true, 'Please add a diametar of component wires'],
    //     min: [0.2, 'Min diametar of component wire is 0.2'],
    //     max: [3.6, 'Max diametar of component wire is 3.6']
    // },
    precnikZice: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi prečnik jedne žice'],
        validate: manyValidators
    },

    // otpor: {
    //     type: mongoose.Types.Decimal128,
    //     required: [true, 'Please add a resistance'],
    //     min: [0.01, 'Min resistance is 0.1'],
    //     max: [24, 'Max resistance is 24']
    // },
    otpor: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi otpor provodnika'],
        validate: {
            validator:resistanceValidation,
            msg: 'Vrednost otpora mora da bude u granicama 0.01 - 24'
        }
    },

    // debIzolacije: {
    //     type: mongoose.Types.Decimal128,
    //     required: [true, 'Please add a insulation thickness'],
    //     //min: [0.3, 'Min insulation thickness is 0.3'],
    //     max: [9, 'Max insulation thickness is 9']
    // },
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

    // debPlasta: {
    //     type: mongoose.Types.Decimal128,
    //     required: [true, 'Please add a sheath thickness'],
    //     min: [0.3, 'Min sheath thickness is 0.3'],
    //     max: [4, 'Max sheath thickness is 4']
    // },
    debPlasta: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi debljinu plašta.'],
        validate: {
            validator: sheathValidation, msg:'Debljina plašta mora da bude manja od 4'
        }       
    },

    // spPrecnik: {
    //     type: mongoose.Types.Decimal128,
    //     required: [true, 'Please add a overall diametar'],
    //     min: [2, 'Min overall diametar is 2'],
    //     max: [70, 'Max overall diametar is 70']
    // },
    spPrecnik: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, 'Unesi spoljnji prečnik kabla'],
        validate: [outdiametarValidation, 'Spoljnji prečnik mora da bude u granicama 2 - 70' ]
    },

    ispitniNapon: {
        type: Number,
        required: [true, 'Please add a test voltage'],
        //enum: ['2kV', '2.5kV', '3kV', '3.5kV', '4kV', '15kV', '21kV', '30kV', '42kV', '50kV', '83.2kV']
        enum: [0, 2, 2.5, 3, 3.5, 4, 15, 21, 30, 42, 50, 83.2]
    },

    parcijalna: {
        type: String,
        trim: true,
        default: "/"
    },

    createdByUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    modifiedByUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    modifiedAt: {
        type: Date
    }
});

// primer pozivanja validacije pre izvršenja update
// ProductSchema.pre('findOneAndUpdate', { document: false, query: true }, async function(req) {
//     // this.getFilter() / this.getQuery() -sinonimi, vraca query tj sifra: 2222222 i pronalazi dokument u db
//     const documentToUpdate = await this.model.findOne(this.getFilter());
//     // this.getUpdate() vraca properties iz req.body - ono sto hocemo da update
//     const updateQuery = this.getUpdate();
// });

module.exports = mongoose.model('Product', ProductSchema);