/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kontrols              ->  index
 * POST    /api/kontrols              ->  create
 * GET     /api/kontrols/:id          ->  show
 * PUT     /api/kontrols/:id          ->  update
 * DELETE  /api/kontrols/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Kontrol = require('./kontrol.model');

var fs = require('bluebird').promisifyAll(require('fs-extra'));
var easyimg = require('easyimage');
var NodePDF = require('bluebird').promisifyAll(require('nodepdf'));
var moment = require('moment');
moment.locale('id');

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

// Gets a list of Kontrols
export function index(req, res) {
    Kontrol.find().populate('_pasien').execAsync()
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Gets a single Kontrol from the DB
export function show(req, res) {
    Kontrol.findOne({
            _pasien: req.params.id
        }).populate('_pasien').execAsync()
        .then(handleEntityNotFound(res))
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Creates a new Kontrol in the DB
export function create(req, res) {
    Kontrol.findByIdAsync(req.body.id)
        .then(handleEntityNotFound(res))
        .then(find => {
            find.kontrol.push({
                pid: find._pasien,
                tanggal: req.body.tanggal,
                registrasi: req.body.registrasi,
                nama: req.body.nama,
                umur: req.body.umur,
                jk: req.body.jk,
                keluhan: req.body.keluhan,
                lab: req.body.lab,
                sputum: req.body.sputum,
                mt: req.body.mt,
                bb: req.body.bb,
                tb: req.body.tb,
                diagnosaid: req.body.diagnosaid,
                diagnosaname: req.body.diagnosaname,
                terapi: req.body.terapi,
                status: req.body.status
            });
            find.saveAsync();
            return find;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function filescreate(req, res) {
    var name = _.kebabCase(req.files.file.name.split('.')[0]) + '-' + moment(req.body.tanggal).format('DDMMYYYY') + '.' + req.files.file.name.split('.')[1].toLowerCase();

    Kontrol.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(find => {
            return fs.ensureDirAsync('./client/app/rekam/main/files/' + find._pasien + '/images')
                .then(() => {
                    return find;
                });
        })
        .then(find => {
            easyimg.exec('convert -thumbnail 80 ' + req.files.file.path + ' ./client/app/rekam/main/files/' + find._pasien + '/images/thumb-' + name);
            return find;
        })
        .then(find => {
            easyimg.exec('convert ' + req.files.file.path + ' ./client/app/rekam/main/files/' + find._pasien + '/images/' + name);
            return find;
        })
        .then(find => {
            find.kontrol.push({
                tanggal: req.body.tanggal,
                registrasi: req.body.registrasi,
                nama: req.body.nama,
                umur: req.body.umur,
                jk: req.body.jk,
                pemeriksaan: name,
                keluhan: req.body.keluhan,
                lab: req.body.lab,
                sputum: req.body.sputum,
                mt: req.body.mt,
                bb: req.body.bb,
                tb: req.body.tb,
                diagnosaid: req.body.diagnosaid,
                diagnosaname: req.body.diagnosaname,
                terapi: req.body.terapi,
                status: req.body.status
            });
            find.saveAsync();
            return find;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function filesupdate(req, res) {
    var name = _.kebabCase(req.files.file.name.split('.')[0]) + '-' + moment(req.body.tanggal).format('DDMMYYYY') + '.' + req.files.file.name.split('.')[1].toLowerCase();

    Kontrol.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(find => {
            return fs.ensureDirAsync('./client/app/rekam/main/files/' + find._pasien + '/images')
                .then(() => {
                    return find;
                });
        })
        .then(find => {
            var index = _.findIndex(find.kontrol, function (chr) {
                return chr._id.toString() === req.body.kid;
            });
            if (find.kontrol[index].pemeriksaan) {
                return fs.removeAsync('./client/app/rekam/main/files/' + find._pasien + '/images/' + find.kontrol[index].pemeriksaan)
                    .then(() => {
                        fs.removeAsync('./client/app/rekam/main/files/' + find._pasien + '/images/thumb-' + find.kontrol[index].pemeriksaan);
                        return find;
                    })
            } else {
                return find;
            }
        })
        .then(find => {
            easyimg.exec('convert -thumbnail 80 ' + req.files.file.path + ' ./client/app/rekam/main/files/' + find._pasien + '/images/thumb-' + name);
            return find;
        })
        .then(find => {
            easyimg.exec('convert ' + req.files.file.path + ' ./client/app/rekam/main/files/' + find._pasien + '/images/' + name);
            return find;
        })
        .then(find => {
            var index = _.findIndex(find.kontrol, function (chr) {
                return chr._id.toString() === req.body.kid;
            });
            find.kontrol[index].tanggal = req.body.tanggal;
            find.kontrol[index].registrasi = req.body.registrasi;
            find.kontrol[index].nama = req.body.nama;
            find.kontrol[index].umur = req.body.umur;
            find.kontrol[index].jk = req.body.jk;
            find.kontrol[index].pemeriksaan = name;
            find.kontrol[index].keluhan = req.body.keluhan;
            find.kontrol[index].lab = req.body.lab;
            find.kontrol[index].sputum = req.body.sputum;
            find.kontrol[index].mt = req.body.mt;
            find.kontrol[index].bb = req.body.bb;
            find.kontrol[index].tb = req.body.tb;
            find.kontrol[index].diagnosaid = req.body.diagnosaid;
            find.kontrol[index].diagnosaname = req.body.diagnosaname;
            find.kontrol[index].terapi = req.body.terapi;
            find.saveAsync();
            return find;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Kontrol in the DB
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Kontrol.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(find => {
            var index = _.findIndex(find.kontrol, function (chr) {
                return chr._id.toString() === req.body.kid;
            });
            find.kontrol[index].tanggal = req.body.tanggal;
            find.kontrol[index].registrasi = req.body.registrasi;
            find.kontrol[index].nama = req.body.nama;
            find.kontrol[index].umur = req.body.umur;
            find.kontrol[index].jk = req.body.jk;
            find.kontrol[index].keluhan = req.body.keluhan;
            find.kontrol[index].lab = req.body.lab;
            find.kontrol[index].sputum = req.body.sputum;
            find.kontrol[index].mt = req.body.mt;
            find.kontrol[index].bb = req.body.bb;
            find.kontrol[index].tb = req.body.tb;
            find.kontrol[index].diagnosaid = req.body.diagnosaid;
            find.kontrol[index].diagnosaname = req.body.diagnosaname;
            find.kontrol[index].terapi = req.body.terapi;
            find.saveAsync();
            return find;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}
export function hapus(req, res) {
    Kontrol.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(find => {
            var index = _.findIndex(find.kontrol, function (chr) {
                return chr._id.toString() === req.body.kid;
            });
            if (find.kontrol[index].pemeriksaan) {
                return fs.removeAsync('./client/app/rekam/main/files/' + find._pasien + '/images/' + find.kontrol[index].pemeriksaan)
                    .then(() => {
                        fs.removeAsync('./client/app/rekam/main/files/' + find._pasien + '/images/thumb-' + find.kontrol[index].pemeriksaan);
                        return find;
                    })
            } else {
                return find;
            }
        })
        .then(find => {
            find.kontrol.pull(req.body.kid);
            find.saveAsync();
            return find;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Kontrol from the DB
export function destroy(req, res) {
    Kontrol.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function cetak(req, res) {
    Kontrol.findAsync()
        .then(pasien => {

            var map = _.chain(pasien).map(function (val) {
                return val.kontrol;
            }).flatten().value();

            var content = '';
            content += '<html>';
            content += '<style>';
            content += 'body {font-size: 12px; font-family: "Times New Roman", Georgia, Serif;}';
            content += 'table {font-size: 12px; width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; border-top: 1px solid #000000; border-left: 1px solid #000000;}';
            content += '.table th, .table td {padding: 2px 4px 4px 4px; text-align: left; vertical-align: middle; border-right: 1px solid #000000; border-bottom: 1px solid #000000;}';
            content += '.table th {font-weight: bold;}';
            content += '.table thead th {vertical-align: middle;}';
            content += 'table td {vertical-align: top;}';
            content += '</style>';
            content += '<body>';
            content += '<table style="border: 0;">';

            if (req.params.d === '0') {
                var filter1 = _.chain(map).filter(function (val) {
                    return moment(val.tanggal).format('MMMM') === req.params.m && moment(val.tanggal).format('YYYY') === req.params.y;
                }).sortBy().value();

                var bydate1 = _.chain(filter1).map(function (val) {
                    return val.tanggal.toString();
                }).uniq().sortBy().value();

                for (var i = 0; i < bydate1.length; i++) {
                    content += '<tr>';
                    content += '<td colspan="5">' + moment(bydate1[i]).format('DD MMMM YYYY') + '<td>';
                    content += '</tr>';
                    for (var j = 0; j < filter1.length; j++) {
                        if (filter1[j].tanggal.toString() === bydate1[i].toString()) {
                            content += '<tr>';
                            content += '<td>' + filter1[j].registrasi + '<td>';
                            content += '<td>' + filter1[j].nama + '<td>';
                            content += '<td>' + filter1[j].umur + '<td>';
                            content += '<td>' + filter1[j].jk + '<td>';
                            content += '<td>' + filter1[j].diagnosaname + '<td>';
                            content += '</tr>';
                        }
                    }
                }
            } else {
                var filter2 = _.chain(map).filter(function (val) {
                    return moment(val.tanggal).format('MMMM') === req.params.m && moment(val.tanggal).format('YYYY') === req.params.y && val.diagnosaid === req.params.d;
                }).value();

                var bydate2 = _.chain(filter2).map(function (val) {
                    return val.tanggal;
                }).uniq().sortBy().value();

                content += '<tr>';
                content += '<td>tidak<td>';
                content += '</tr>';
            }

            content += '</table>';
            content += '</body>';
            content += '</html>';

            var options = {
                'content': content,
                'paperSize': {
                    'pageFormat': 'A4',
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