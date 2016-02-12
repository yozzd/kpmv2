/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/masuks              ->  index
 * POST    /api/masuks              ->  create
 * GET     /api/masuks/:id          ->  show
 * PUT     /api/masuks/:id          ->  update
 * DELETE  /api/masuks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Masuk = require('./masuk.model');
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

// Gets a list of Masuks
export function index(req, res) {
    Masuk.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Masuk from the DB
export function show(req, res) {
    Masuk.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Masuk in the DB
export function create(req, res) {
    Masuk.createAsync({
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
                        masuk: entity.masuk + _.parseInt(req.body.jumlah)
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

// Updates an existing Masuk in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Masuk.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(saved => {
            return Obat.findById(saved._obat).populate('_masuk').execAsync()
                .then(entity => {
                    var updates = {
                        masuk: _.chain(entity._masuk).map(function (v) {
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

// Deletes a Masuk from the DB
export function destroy(req, res) {
    Masuk.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saved => {
            return Obat.findById(saved._obat).populate('_masuk').execAsync()
                .then(entity => {
                    var updates = {
                        masuk: entity.masuk - saved.jumlah
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