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