'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var KonsultasiSchema = new mongoose.Schema({
    konsultasi: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_konsultasi'
    }
});

KonsultasiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Konsultasi', KonsultasiSchema, 'konsultasi');