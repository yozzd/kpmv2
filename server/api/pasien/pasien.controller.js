/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pasiens              ->  index
 * POST    /api/pasiens              ->  create
 * GET     /api/pasiens/:id          ->  show
 * PUT     /api/pasiens/:id          ->  update
 * DELETE  /api/pasiens/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Pasien = require('./pasien.model');
var Anamnesa = require('../anamnesa/anamnesa.model');
var Fisik = require('../fisik/fisik.model');
var Radiologi = require('../radiologi/radiologi.model');
var Laboratorium = require('../laboratorium/laboratorium.model');
var Medis = require('../medis/medis.model');
var Diagnosa = require('../diagnosa/diagnosa.model');
var Pengobatan = require('../pengobatan/pengobatan.model');
var Terapi = require('../terapi/terapi.model');
var Rehabilitasi = require('../rehabilitasi/rehabilitasi.model');
var Konsultasi = require('../konsultasi/konsultasi.model');
var Usul = require('../usul/usul.model');

var fs = require('bluebird').promisifyAll(require('fs-extra'));
//var NodePDF = require('nodepdf');
var NodePDF = require('bluebird').promisifyAll(require('nodepdf'));

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

function responseWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function saveUpdates(updates) {
    return function (entity) {
        var updated = _.merge(entity, updates);
        return updated.saveAsync()
            .spread(updated => {
                return updated;
            });
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.removeAsync()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

// Gets a list of Pasiens
export function index(req, res) {
    Pasien.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Pasien from the DB
export function show(req, res) {
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Pasien in the DB
export function create(req, res) {
    Pasien.findOneAsync({
            registrasi: req.body.registrasi
        })
        .then(found => {
            if (found) {
                throw 'Nomor Registrasi "' + req.body.registrasi + '" sudah terdaftar!'
            } else {
                var newPasien = new Pasien({
                    registrasi: req.body.registrasi,
                    tanggal: req.body.tanggal,
                    nama: req.body.nama,
                    lahir: req.body.lahir,
                    umur: req.body.umur,
                    jk: req.body.jk,
                    suku: req.body.suku,
                    agama: req.body.agama,
                    pekerjaan: req.body.pekerjaan,
                    sk: req.body.sk,
                    jalan: req.body.jalan,
                    lingkungan: req.body.lingkungan,
                    kelkec: req.body.kelkec,
                    kotakab: req.body.kotakab,
                    provinsi: req.body.provinsi,
                    telp: req.body.telp,
                    dikirim: req.body.dikirim,
                    kdikirim: req.body.kdikirim,
                    pembiayaan: req.body.pembiayaan,
                    kpembiayaan: req.body.kpembiayaan
                });
                return newPasien.saveAsync()
                    .then(saved => {
                        var newAnamnesa = new Anamnesa({
                            _pasien: saved[0]._id
                        });
                        newAnamnesa.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newFisik = new Fisik({
                            _pasien: saved[0]._id
                        });
                        newFisik.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newRadiologi = new Radiologi({
                            _pasien: saved[0]._id
                        });
                        newRadiologi.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newLaboratorium = new Laboratorium({
                            _pasien: saved[0]._id
                        });
                        newLaboratorium.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newMedis = new Medis({
                            _pasien: saved[0]._id
                        });
                        newMedis.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newDiagnosa = new Diagnosa({
                            _pasien: saved[0]._id
                        });
                        newDiagnosa.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newPengobatan = new Pengobatan({
                            _pasien: saved[0]._id
                        });
                        newPengobatan.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newTerapi = new Terapi({
                            _pasien: saved[0]._id
                        });
                        newTerapi.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newRehabilitasi = new Rehabilitasi({
                            _pasien: saved[0]._id
                        });
                        newRehabilitasi.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newKonsultasi = new Konsultasi({
                            _pasien: saved[0]._id
                        });
                        newKonsultasi.saveAsync();
                        return saved;
                    })
                    .then(saved => {
                        var newUsul = new Usul({
                            _pasien: saved[0]._id
                        });
                        newUsul.saveAsync();
                        return saved;
                    });
            }
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Pasien in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Pasien from the DB
export function destroy(req, res) {
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function cetak(req, res) {
    Pasien.findByIdAsync(req.params.id)
        .then(pasien => {

            var content = '';
            content += '<html>';
            content += '<style>';
            content += 'body {font-size: 12px;}';
            content += 'table {font-size: 12px; width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; border-top: 1px solid #000000; border-left: 1px solid #000000;}';
            content += '.table th, .table td {padding: 2px 4px 4px 4px; text-align: left; vertical-align: middle; border-right: 1px solid #000000; border-bottom: 1px solid #000000;}';
            content += '.table th {font-weight: bold;}';
            content += '.table thead th {vertical-align: middle;}';
            content += '</style>';
            content += '<body>';

            content += '<div style="text-align: center;">';
            content += '<h3>KESEHATAN PARU MASYARAKAT (KPM)<br/>UPT. DINAS KESEHATAN PROVINSI SUMATERA UTARA</h3>';
            content += '<p><strong><u>KARTU STATUS PASIEN RAWAT JALAN</u></strong></p>';
            content += '</div>';

            content += '</body>';
            content += '</html>';

            var options = {
                'content': content,
                'paperSize': {
                    'format': 'A4',
                    'orientation': 'portrait',
                    'margin': {
                        'top': '2cm',
                        'right': '2cm',
                        'bottom': '2cm',
                        'left': '2cm'
                    }
                }
            }

            NodePDF.renderAsync(null, './client/app/rekam/main/files/' + req.params.id + '/pdf/' + req.params.id + '.pdf', options)
                .then(() => {
                    fs.readFileAsync('./client/app/rekam/main/files/' + req.params.id + '/pdf/' + req.params.id + '.pdf')
                        .then(data => {
                            res.contentType('application/pdf');
                            res.send(data);
                        })
                })
        });
}