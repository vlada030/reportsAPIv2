const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Unesite korisničko ime']
    },

    email: {
        type: String,
        required: [true, "Unesite svoj e-mail"],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Pogrešan format email adrese'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Unesite šifru'],
        minlength: 6,
        select: false
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encripcija passworda sa bcryptom, dodato je kao middleware ovde da se nebi komplikovao controller
// ako middleware sadrzi async fju onda ne mora (a moze!) da se stavlja next
UserSchema.pre('save', async function() {
    // pozivanje bcrypta - async fja
    // sto je veći broj u zagradi veca je sigurnost, ali usporava sistem
    const salt = await bcrypt.genSalt(10);
    // password je ime promenjive u controleru, odmah iznad User.create gde je ovaj middleware pozicioniran
    this.password = await bcrypt.hash(this.password, salt);
    
});

// pravljenje tokena dodato ovde da se nebi komplikovao controler
// posto je metod (ne statics) poziva se na onome sto vraca npr UserSchema.create tj user koji ima svoj id 
// statics bi se pozivao na modelu tj User
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// methods za proveru unesene sifre i one bcryptovane u bazu
UserSchema.methods.passwordMatchCheck = async function (enteredPass) {
    return await bcrypt.compare(enteredPass, this.password);
};

module.exports = mongoose.model('User', UserSchema);