'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var relationship = require('mongoose-relationship');

var LaboratoriumSchema = new mongoose.Schema({
    hb: {
        type: String,
        default: '',
        trim: true
    },
    led: {
        type: String,
        default: '',
        trim: true
    },
    leukosit: {
        type: String,
        default: '',
        trim: true
    },
    thrombosit: {
        type: String,
        default: '',
        trim: true
    },
    erythrosit: {
        type: String,
        default: '',
        trim: true
    },
    haematokrit: {
        type: String,
        default: '',
        trim: true
    },
    goldarah: {
        type: String,
        default: '',
        trim: true
    },
    ph: {
        type: String,
        default: '',
        trim: true
    },
    reduksi: {
        type: String,
        default: '',
        trim: true
    },
    protein: {
        type: String,
        default: '',
        trim: true
    },
    bilirubin: {
        type: String,
        default: '',
        trim: true
    },
    sedimen: {
        type: String,
        default: '',
        trim: true
    },
    faeces: {
        type: String,
        default: '',
        trim: true
    },
    dsbta: {
        type: String,
        default: '',
        trim: true
    },
    dsbta1: {
        type: String,
        default: '',
        trim: true
    },
    dsbta2: {
        type: String,
        default: '',
        trim: true
    },
    dsbta3: {
        type: String,
        default: '',
        trim: true
    },
    btatgl: {
        type: Date,
        default: '',
        trim: true
    },
    btasensitif: {
        type: String,
        default: '',
        trim: true
    },
    btaresinten: {
        type: String,
        default: '',
        trim: true
    },
    dssputum: {
        type: String,
        default: '',
        trim: true
    },
    sputumtgl: {
        type: Date,
        default: '',
        trim: true
    },
    sputumsensitif: {
        type: String,
        default: '',
        trim: true
    },
    sputumresinten: {
        type: String,
        default: '',
        trim: true
    },
    jamur: {
        type: String,
        default: '',
        trim: true
    },
    jamurtgl: {
        type: Date,
        default: '',
        trim: true
    },
    kulturpleuratgl: {
        type: Date,
        default: '',
        trim: true
    },
    analisapleuratgl: {
        type: Date,
        default: '',
        trim: true
    },
    rivalta: {
        type: String,
        default: '',
        trim: true
    },
    ldhpleura: {
        type: String,
        default: '',
        trim: true
    },
    proteinpleura: {
        type: String,
        default: '',
        trim: true
    },
    transudat: {
        type: String,
        default: '',
        trim: true
    },
    faalhatitgl: {
        type: Date,
        default: '',
        trim: true
    },
    sgot: {
        type: String,
        default: '',
        trim: true
    },
    sgpt: {
        type: String,
        default: '',
        trim: true
    },
    biltotal: {
        type: String,
        default: '',
        trim: true
    },
    bildirect: {
        type: String,
        default: '',
        trim: true
    },
    fosfatase: {
        type: String,
        default: '',
        trim: true
    },
    elektrofores: {
        type: String,
        default: '',
        trim: true
    },
    total: {
        type: String,
        default: '',
        trim: true
    },
    faalginjaltgl: {
        type: Date,
        default: '',
        trim: true
    },
    ureum: {
        type: String,
        default: '',
        trim: true
    },
    kratinin: {
        type: String,
        default: '',
        trim: true
    },
    asamurat: {
        type: String,
        default: '',
        trim: true
    },
    kratininurine: {
        type: String,
        default: '',
        trim: true
    },
    proteinurine: {
        type: String,
        default: '',
        trim: true
    },
    elektrolittgl: {
        type: Date,
        default: '',
        trim: true
    },
    natrium: {
        type: String,
        default: '',
        trim: true
    },
    kalium: {
        type: String,
        default: '',
        trim: true
    },
    chlorida: {
        type: String,
        default: '',
        trim: true
    },
    agda: {
        type: String,
        default: '',
        trim: true
    },
    jantungtgl: {
        type: Date,
        default: '',
        trim: true
    },
    ekg: {
        type: String,
        default: '',
        trim: true
    },
    treadmill: {
        type: String,
        default: '',
        trim: true
    },
    cpk: {
        type: String,
        default: '',
        trim: true
    },
    ldhjantung: {
        type: String,
        default: '',
        trim: true
    },
    troponin: {
        type: String,
        default: '',
        trim: true
    },
    glukosatgl: {
        type: Date,
        default: '',
        trim: true
    },
    glukosapuasa: {
        type: String,
        default: '',
        trim: true
    },
    glukosapp: {
        type: String,
        default: '',
        trim: true
    },
    glukosarandom: {
        type: String,
        default: '',
        trim: true
    },
    lipidtgl: {
        type: Date,
        default: '',
        trim: true
    },
    hdl: {
        type: String,
        default: '',
        trim: true
    },
    ldl: {
        type: String,
        default: '',
        trim: true
    },
    cholesterol: {
        type: String,
        default: '',
        trim: true
    },
    triglecerida: {
        type: String,
        default: '',
        trim: true
    },
    lipidtotal: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: '_laboratorium'
    }
});

LaboratoriumSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

export default mongoose.model('Laboratorium', LaboratoriumSchema, 'laboratorium');