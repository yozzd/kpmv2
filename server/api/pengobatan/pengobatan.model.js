'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var PengobatanSchema = new mongoose.Schema({
    tb: {
        type: String,
        default: '',
        trim: true
    },
    tb1: {
        type: String,
        default: '',
        trim: true
    },
    tb2: {
        type: String,
        default: '',
        trim: true
    },
    tb3: {
        type: String,
        default: '',
        trim: true
    },
    tb4: {
        type: String,
        default: '',
        trim: true
    },
    tb5: {
        type: String,
        default: '',
        trim: true
    },
    nontb1: {
        type: String,
        default: '',
        trim: true
    },
    nontb2: {
        type: String,
        default: '',
        trim: true
    },
    nontb3: {
        type: String,
        default: '',
        trim: true
    },
    nontb4: {
        type: String,
        default: '',
        trim: true
    },
    nontb5: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_pengobatan'
    }
});

PengobatanSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Pengobatan', PengobatanSchema, 'pengobatan');