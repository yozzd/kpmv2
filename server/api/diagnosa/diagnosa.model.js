'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var DiagnosaSchema = new mongoose.Schema({
    pdiagnosa: {
        type: String,
        default: '',
        trim: true
    },
    ptbparu: {
        type: String,
        default: '',
        trim: true
    },
    ptbparupositif: {
        type: String,
        default: '',
        trim: true
    },
    ptbparunegatif: {
        type: String,
        default: '',
        trim: true
    },
    ptbparuekstra: {
        type: String,
        default: '',
        trim: true
    },
    ptbparuekstralokasi: {
        type: String,
        default: '',
        trim: true
    },
    pispa: {
        type: String,
        default: '',
        trim: true
    },
    ppneumonia: {
        type: String,
        default: '',
        trim: true
    },
    ppleura: {
        type: String,
        default: '',
        trim: true
    },
    ppneumothoraks1: {
        type: String,
        default: '',
        trim: true
    },
    ppneumothoraks2: {
        type: String,
        default: '',
        trim: true
    },
    pefusi: {
        type: String,
        default: '',
        trim: true
    },
    pbronkhial: {
        type: String,
        default: '',
        trim: true
    },
    pdewasa: {
        type: String,
        default: '',
        trim: true
    },
    panak: {
        type: String,
        default: '',
        trim: true
    },
    pppok: {
        type: String,
        default: '',
        trim: true
    },
    peksaserbasi: {
        type: String,
        default: '',
        trim: true
    },
    ptptipe: {
        type: String,
        default: '',
        trim: true
    },
    ptpstadium: {
        type: String,
        default: '',
        trim: true
    },
    pvascular: {
        type: String,
        default: '',
        trim: true
    },
    psequele: {
        type: String,
        default: '',
        trim: true
    },
    pparu: {
        type: String,
        default: '',
        trim: true
    },
    pnonparu: {
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