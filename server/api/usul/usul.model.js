'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var UsulSchema = new mongoose.Schema({
    usul1: {
        type: String,
        default: '',
        trim: true
    },
    usul2: {
        type: String,
        default: '',
        trim: true
    },
    usul3: {
        type: String,
        default: '',
        trim: true
    },
    usul4: {
        type: String,
        default: '',
        trim: true
    },
    usul5: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_usul'
    }
});

UsulSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Usul', UsulSchema, 'usul');