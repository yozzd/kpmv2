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
    },
    suku: {
        type: String,
        default: '',
        trim: true
    },
    agama: {
        type: String,
        default: '',
        trim: true
    },
    pekerjaan: {
        type: String,
        default: '',
        trim: true
    },
    sk: {
        type: String,
        default: '',
        trim: true
    },
    jalan: {
        type: String,
        default: '',
        trim: true
    },
    lingkungan: {
        type: String,
        default: '',
        trim: true
    },
    kelkec: {
        type: String,
        default: '',
        trim: true
    },
    kotakab: {
        type: String,
        default: '',
        trim: true
    },
    provinsi: {
        type: String,
        default: '',
        trim: true
    },
    telp: {
        type: String,
        default: '',
        trim: true
    },
    dikirim: {
        type: String,
        default: '',
        trim: true
    },
    kdikirim: {
        type: String,
        default: '',
        trim: true
    },
    pembiayaan: {
        type: String,
        default: '',
        trim: true
    },
    kpembiayaan: {
        type: String,
        default: '',
        trim: true
    },
    _anamnesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anamnesa'
    }
});

export default mongoose.model('Pasien', PasienSchema, 'pasien');