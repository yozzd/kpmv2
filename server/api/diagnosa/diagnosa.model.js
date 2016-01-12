'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var DiagnosaSchema = new mongoose.Schema({
    pdid: {
        type: String,
        default: '',
        trim: true
    },
    pdname: {
        type: String,
        default: '',
        trim: true
    },
    pdid1: {
        type: String,
        default: '',
        trim: true
    },
    pdid2: {
        type: String,
        default: '',
        trim: true
    },
    pdid4: {
        type: String,
        default: '',
        trim: true
    },
    pdid4k: {
        type: String,
        default: '',
        trim: true
    },
    pdid5: {
        type: String,
        default: '',
        trim: true
    },
    pdid13: {
        type: String,
        default: '',
        trim: true
    },
    pdid13k: {
        type: String,
        default: '',
        trim: true
    },
    pdid14: {
        type: String,
        default: '',
        trim: true
    },
    pdid28: {
        type: String,
        default: '',
        trim: true
    },
    pdid33k1: {
        type: String,
        default: '',
        trim: true
    },
    pdid33k2: {
        type: String,
        default: '',
        trim: true
    },
    pdid35: {
        type: String,
        default: '',
        trim: true
    },
    pdid36: {
        type: String,
        default: '',
        trim: true
    },
    pdid37: {
        type: String,
        default: '',
        trim: true
    },
    pdid38: {
        type: String,
        default: '',
        trim: true
    },
    sdid: {
        type: String,
        default: '',
        trim: true
    },
    sdname: {
        type: String,
        default: '',
        trim: true
    },
    ksd: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_diagnosa'
    }
});

DiagnosaSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Diagnosa', DiagnosaSchema, 'diagnosa');