/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/anamnesas              ->  index
 * POST    /api/anamnesas              ->  create
 * GET     /api/anamnesas/:id          ->  show
 * PUT     /api/anamnesas/:id          ->  update
 * DELETE  /api/anamnesas/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Anamnesa = require('./anamnesa.model');

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

// Gets a list of Anamnesas
export function index(req, res) {
    Anamnesa.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Anamnesa from the DB
export function show(req, res) {
    Anamnesa.findOne({
            _pasien: req.params.id
        }).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Anamnesa in the DB
export function create(req, res) {
    Anamnesa.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Anamnesa in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Anamnesa.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Anamnesa from the DB
export function destroy(req, res) {
    Anamnesa.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}