'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PasienSchema = new mongoose.Schema({
    registrasi: {
        type: String,
        default: '',
        trim: true
    },
    tanggal: {
        type: Date,
        default: '',
        trim: true
    },
    nama: {
        type: String,
        default: '',
        trim: true
    },
    lahir: {
        type: Date,
        default: '',
        trim: true
    },
    umur: {
        type: String,
        default: '',
        trim: true
    },
    jk: {
        type: String,
        default: '',
        trim: true
    }
});

export default mongoose.model('Pasien', PasienSchema, 'pasien');