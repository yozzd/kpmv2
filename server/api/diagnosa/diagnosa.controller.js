/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/diagnosas              ->  index
 * POST    /api/diagnosas              ->  create
 * GET     /api/diagnosas/:id          ->  show
 * PUT     /api/diagnosas/:id          ->  update
 * DELETE  /api/diagnosas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Diagnosa = require('./diagnosa.model');
var Kontrol = require('../kontrol/kontrol.model');

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

// Gets a list of Diagnosas
export function index(req, res) {
    Diagnosa.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Diagnosa from the DB
export function show(req, res) {
    Diagnosa.findOne({
            _pasien: req.params.id
        }).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Diagnosa in the DB
export function create(req, res) {
    Diagnosa.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Diagnosa in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Diagnosa.findById(req.params.id).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(saved => {
            return Kontrol.findOneAsync({
                    _pasien: saved._pasien._id
                })
                .then(find => {
                    if (!find.kontrol[0]) {
                        find.kontrol.push({
                            pid: saved._pasien._id,
                            tanggal: saved._pasien.tanggal,
                            registrasi: saved._pasien.registrasi,
                            nama: saved._pasien.nama,
                            umur: saved._pasien.umur,
                            jk: saved._pasien.jk,
                            diagnosaid: saved.pdid,
                            diagnosaname: saved.pdname,
                            status: 'B',
                        });
                        return find.saveAsync();
                    } else {
                        find.kontrol[0].pid = saved._pasien._id;
                        find.kontrol[0].tanggal = saved._pasien.tanggal;
                        find.kontrol[0].registrasi = saved._pasien.registrasi;
                        find.kontrol[0].nama = saved._pasien.nama;
                        find.kontrol[0].umur = saved._pasien.umur;
                        find.kontrol[0].jk = saved._pasien.jk;
                        find.kontrol[0].diagnosaid = saved.pdid;
                        find.kontrol[0].diagnosaname = saved.pdname;
                        find.kontrol[0].status = 'B';
                        return find.saveAsync();
                    }
                });
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Diagnosa from the DB
export function destroy(req, res) {
    Diagnosa.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}