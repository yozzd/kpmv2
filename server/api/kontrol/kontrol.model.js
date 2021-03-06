'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var KontrolSchema = new mongoose.Schema({
    kontrol: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId
        },
        tanggal: {
            type: Date,
            default: '',
            trim: true
        },
        registrasi: {
            type: String,
            default: '',
            trim: true
        },
        nama: {
            type: String,
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
        pemeriksaan: {
            type: String,
            default: '',
            trim: true
        },
        keluhan: {
            type: String,
            default: '',
            trim: true
        },
        lab: {
            type: String,
            default: '',
            trim: true
        },
        sputum: {
            type: String,
            default: '',
            trim: true
        },
        mt: {
            type: String,
            default: '',
            trim: true
        },
        bb: {
            type: String,
            default: '',
            trim: true
        },
        tb: {
            type: String,
            default: '',
            trim: true
        },
        diagnosaid: {
            type: String,
            default: '',
            trim: true
        },
        diagnosaname: {
            type: String,
            default: '',
            trim: true
        },
        terapi: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            default: '',
            trim: true
        }
    }],
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_kontrol'
    }
});

KontrolSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Kontrol', KontrolSchema, 'kontrol');