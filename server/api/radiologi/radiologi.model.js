'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require("mongoose-relationship");

var RadiologiSchema = new mongoose.Schema({
    image: {
        type: String,
        default: '',
        trim: true
    },
    thorakpatgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakpahasil: {
        type: String,
        default: '',
        trim: true
    },
    thorakcttgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakcthasil: {
        type: String,
        default: '',
        trim: true
    },
    thorakusgtgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakusghasil: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_radiologi'
    }
});

RadiologiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Radiologi', RadiologiSchema, 'radiologi');