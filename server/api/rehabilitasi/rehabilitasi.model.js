'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var RehabilitasiSchema = new mongoose.Schema({
    rehabilitasi: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_rehabilitasi'
    }
});

RehabilitasiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Rehabilitasi', RehabilitasiSchema, 'rehabilitasi');