'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var KeluarSchema = new mongoose.Schema({
    tanggal: {
        type: Date,
        default: '',
        trim: true
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
    jumlah: {
        type: Number,
        default: 0,
        trim: true
    },
    _obat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Obat',
        childPath: '_keluar'
    }
});

KeluarSchema.plugin(relationship, {
    relationshipPathName: '_obat'
});

export default mongoose.model('Keluar', KeluarSchema, 'keluar');