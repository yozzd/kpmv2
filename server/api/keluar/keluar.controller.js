/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/keluars              ->  index
 * POST    /api/keluars              ->  create
 * GET     /api/keluars/:id          ->  show
 * PUT     /api/keluars/:id          ->  update
 * DELETE  /api/keluars/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Keluar = require('./keluar.model');
var Obat = require('../obat/obat.model');

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

// Gets a list of Keluars
export function index(req, res) {
    Keluar.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Keluar from the DB
export function show(req, res) {
    Keluar.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Keluar in the DB
export function create(req, res) {
    Keluar.createAsync({
            tanggal: req.body.tanggal,
            obat: req.body.obat,
            satuan: req.body.satuan,
            jumlah: req.body.jumlah,
            _obat: req.body.id
        })
        .then(create => {
            return Obat.findByIdAsync(req.body.id)
                .then(entity => {
                    var updates = {
                        keluar: entity.keluar + _.parseInt(req.body.jumlah)
                    };
                    var updated = _.merge(entity, updates);
                    updated.saveAsync();
                })
                .then(() => {
                    return create;
                });
        })
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Keluar in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Keluar.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(saved => {
            return Obat.findById(saved._obat).populate('_keluar').execAsync()
                .then(entity => {
                    var updates = {
                        keluar: _.chain(entity._keluar).map(function (v) {
                            return v.jumlah
                        }).sum().value()
                    };
                    var updated = _.merge(entity, updates);
                    updated.saveAsync();
                })
                .then(() => {
                    return saved;
                });
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Keluar from the DB
export function destroy(req, res) {
    Keluar.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saved => {
            return Obat.findById(saved._obat).populate('_keluar').execAsync()
                .then(entity => {
                    var updates = {
                        keluar: entity.keluar - saved.jumlah
                    };
                    var updated = _.merge(entity, updates);
                    updated.saveAsync();
                })
                .then(() => {
                    return saved;
                });
        })
        .then(removeEntity(res))
        .catch(handleError(res));
}