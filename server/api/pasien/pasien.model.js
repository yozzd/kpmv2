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
    resep: [{
        tanggal: {
            type: Date,
            default: '',
            trim: true
        },
        dokter: {
            type: String,
            default: '',
            trim: true
        },
        image: {
            type: String,
            default: '',
            trim: true
        },
        items: [{
            oid: {
                type: mongoose.Schema.Types.ObjectId
            },
            obat: {
                type: String,
                default: '',
                trim: true
            },
            satuan: {
                type: String,
                default: '',
                trim: true
            },
            keterangan: {
                type: String,
                default: '',
                trim: true
            },
            jumlah: {
                type: Number,
                default: '',
                trim: true
            }
        }]
    }],
    _anamnesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anamnesa'
    },
    _fisik: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fisik'
    },
    _radiologi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Radiologi'
    },
    _laboratorium: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Laboratorium'
    },
    _medis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medis'
    },
    _diagnosa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Diagnosa'
    },
    _pengobatan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pengobatan'
    },
    _terapi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Terapi'
    },
    _rehabilitasi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rehabilitasi'
    },
    _konsultasi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Konsultasi'
    },
    _usul: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usul'
    },
    _kontrol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Kontrol'
    }
});

export default mongoose.model('Pasien', PasienSchema, 'pasien');