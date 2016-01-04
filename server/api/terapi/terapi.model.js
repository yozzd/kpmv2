'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var TerapiSchema = new mongoose.Schema({
    terapi: {
        type: String,
        default: '',
        trim: true
    },
    punctie: {
        type: String,
        default: '',
        trim: true
    },
    kpunctie: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_terapi'
    }
});

TerapiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Terapi', TerapiSchema, 'terapi');