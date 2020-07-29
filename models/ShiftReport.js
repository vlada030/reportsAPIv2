const mongoose = require('mongoose');

const shiftReportsSchema = new mongoose.Schema({
    smena: {
        type: String,
        enum: ['prva', 'druga']
    },

    pr1_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr1_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    pr2_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pr2_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    pak_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pak_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    kor_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    kor_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    pp_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    pp_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    tel_0: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_1: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_2: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_3: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_4: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_5: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_6: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_7: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_8: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_9: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_10: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [200, 'Najveci broj je 300']
    },

    tel_11: {
        type: Number,
        min: [1, 'Najmanji broj je 1'],
        max: [2000, 'Najveci broj je 2000']
    },

    radnik1_ime : {
        type: String
    },

    radnik1_k: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik1_r: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik1_d: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik1_vreme: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [12, 'Najveca vrednost je 12 sati']
    },

    radnik1_0: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_1: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_2: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_3: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_4: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_5: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_6: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_7: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_8: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [200, 'Najveca vrednost je 100']
    },

    radnik1_9: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [2000, 'Najveca vrednost je 100']
    },

    radnik1_10: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [2000, 'Najveca vrednost je 100']
    },

    radnik2_ime : {
        type: String
    },

    radnik2_k: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik2_r: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik2_d: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [100, 'Najveca vrednost je 100']
    },

    radnik2_vreme: {
        type: Number,
        min: [0, 'Broj ne moze biti negativan'],
        max: [12, 'Najveca vrednost je 12 sati']
    },

    radnik2_nap: {
        type: String,
        maxlength: [150, 'Napomena ne moze da bude duza od 150 karaktera']
    },



}, {
    timestamps: true
});

module.exports = mongoose.model('ShiftReport', shiftReportsSchema);