'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ObatSchema = new mongoose.Schema({
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
    masuk: {
        type: Number,
        default: 0,
        trim: true
    },
    keluar: {
        type: Number,
        default: 0,
        trim: true
    },
    _masuk: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Masuk'
    }],
    _keluar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keluar'
    }]
});

export default mongoose.model('Obat', ObatSchema, 'obat');