/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/terapis              ->  index
 * POST    /api/terapis              ->  create
 * GET     /api/terapis/:id          ->  show
 * PUT     /api/terapis/:id          ->  update
 * DELETE  /api/terapis/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Terapi = require('./terapi.model');

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

// Gets a list of Terapis
export function index(req, res) {
    Terapi.findAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Terapi from the DB
export function show(req, res) {
    Terapi.findOne({
            _pasien: req.params.id
        }).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Terapi in the DB
export function create(req, res) {
    Terapi.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
}

// Updates an existing Terapi in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Terapi.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(saveUpdates(req.body))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Terapi from the DB
export function destroy(req, res) {
    Terapi.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}