'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var SatuanSchema = new mongoose.Schema({
    satuan: {
        type: String,
        default: '',
        trim: true
    }
});

export default mongoose.model('Satuan', SatuanSchema, 'satuan');