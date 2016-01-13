/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/radiologis              ->  index
 * POST    /api/radiologis              ->  create
 * GET     /api/radiologis/:id          ->  show
 * PUT     /api/radiologis/:id          ->  update
 * DELETE  /api/radiologis/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Radiologi = require('./radiologi.model');
var fs = require('bluebird').promisifyAll(require('fs-extra'));
var easyimg = require('easyimage');

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

// Gets a list of Radiologis
export function index(req, res) {
    Radiologi.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Radiologi from the DB
export function show(req, res) {
    Radiologi.findOne({
            _pasien: req.params.id
        }).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Radiologi in the DB
export function create(req, res) {
    Radiologi.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Radiologi in the DB
export function files(req, res) {
    var name = _.kebabCase(req.files.file.name.split('.')[0]) + '.' + req.files.file.name.split('.')[1].toLowerCase();
    req.body.image = name;

    if (req.body._id) {
        delete req.body._id;
    }
    Radiologi.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(pasien => {
            return fs.ensureDirAsync('./client/app/rekam/main/files/' + pasien._pasien + '/images')
                .then(() => {
                    return pasien;
                });
        })
        .then(pasien => {
            if (pasien.image) {
                return fs.removeAsync('./client/app/rekam/main/files/' + pasien._pasien + '/images/' + pasien.image)
                    .then(() => {
                        fs.removeAsync('./client/app/rekam/main/files/' + pasien._pasien + '/images/thumb-' + pasien.image);
                        return pasien;
                    })
            } else {
                return pasien;
            }
        })
        .then(pasien => {
            easyimg.exec('convert -thumbnail 80 ' + req.files.file.path + ' ./client/app/rekam/main/files/' + pasien._pasien + '/images/thumb-' + name);
            return pasien;
        })
        .then(pasien => {
            easyimg.exec('convert ' + req.files.file.path + ' ./client/app/rekam/main/files/' + pasien._pasien + '/images/' + name);
            return pasien;
        })
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Radiologi.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Radiologi from the DB
export function destroy(req, res) {
    Radiologi.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}