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
    var diagnosa = ['Semua Diagnosa', 'TB Paru BTA Positif', 'TB Paru BTA Negatif', 'TB Paru Anak (Tersangka)',
                'TB Ekstra Paru', 'ISPA (Infeksi Saluran Pernafasan Akut) : Pneumonia', 'ISPA (Infeksi Saluran Pernafasan Akut) : Bronkhitis',
                'ISPA (Infeksi Saluran Pernafasan Akut) : Influenza / Flu', 'ISPA (Infeksi Saluran Pernafasan Akut) : Rhinitis',
                'ISPA (Infeksi Saluran Pernafasan Akut) : Tonsilitis', 'ISPA (Infeksi Saluran Pernafasan Akut) : Faryingitis / Tonsillofaringitis',
                'ISPA (Infeksi Saluran Pernafasan Akut) : Laringitis', 'ISPA (Infeksi Saluran Pernafasan Akut) : Sinusitis',
                'Penyakit / Kelainan Pleura : Pneumothoraks', 'Penyakit / Kelainan Pleura : Efusi Pleura (Hemathothoraks / Empyema)',
                'Penyakit / Kelainan Pleura : Hydropneumothoraks', 'Penyakit / Kelainan Pleura : Tumor Pleura',
                'Penyakit / Kelainan Pleura : Schwarte', 'Asma Bronkhial (Dewasa) : Intermitten', 'Asma Bronkhial (Dewasa) : Persisten Ringan',
                'Asma Bronkhial (Dewasa) : Persisten Sedang', 'Asma Bronkhial (Dewasa) : Persisten Berat', 'Asma Bronkhial (Dewasa) : Eksaserbasi Berat',
                'Asma Bronkhial (Dewasa) : Status Asmaticus', 'Asma Bronkhial (Anak) : Episodik Jarang', 'Asma Bronkhial (Anak) : Episodik Sering',
                'Asma Bronkhial (Anak) : Asma Persisten', 'Penyakit Paru Obstruktif Kronik (PPOK) : Stabil', 'Penyakit Paru Obstruktif Kronik (PPOK) : Eksaserbasi Akut',
                'Cor Pulmonale Chronicum (CPC)', 'Bronkhiektasis', 'Atelektasis', 'Abses Paru', 'Tumor Paru', 'Tumor Mediastinum',
                'Penyakit Vascular Paru', 'Sequele Tuberkulosis', 'Penyakit Paru / Saluran Nafas Lainnya', 'Penyakit Non Paru / Non Saluran Nafas Lainnya',
        ];

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

            if (req.params.d === '0') {
                content += '<h3 style="text-align: center;"><u>Rekapitulasi Data Pasien untuk Bulan ' + req.params.m + ' Tahun ' + req.params.y + '</u></h3>';
            } else {
                content += '<h3 style="text-align: center;"><u>Rekapitulasi Data Pasien untuk Bulan ' + req.params.m + ' Tahun ' + req.params.y + ' <br>Diagnosa ' + diagnosa[req.params.d] + '</u></h3>';
            }

            content += '<table style="border: 0;">';
            content += '<thead>';
            content += '<tr>';
            content += '<th style="text-align: center; height: 30px;">No. Registrasi</th>';
            content += '<th style="text-align: center; height: 30px;">Nama</th>';
            content += '<th style="text-align: center; height: 30px;">Umur</th>';
            content += '<th style="text-align: center; height: 30px;">Jenis Kelamin</th>';
            content += '<th style="text-align: center; height: 30px;">Diagnosa</th>';
            content += '<th style="text-align: center; height: 30px; width: 3%;">B</th>';
            content += '<th style="text-align: center; height: 30px; width: 3%;">L</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';

            if (req.params.d === '0') {

                var filter1 = _.chain(map).filter(function (val) {
                    return moment(new Date(val.tanggal)).format('MMMM') === req.params.m && moment(new Date(val.tanggal)).format('YYYY') === req.params.y;
                }).value();

                var bydate1 = _.chain(filter1).map(function (val) {
                    return new Date(val.tanggal).toISOString();
                }).uniq().sortBy().value();

                for (var i = 0; i < bydate1.length; i++) {
                    content += '<tr>';
                    content += '<td colspan="7" style="background: #eee;"><strong>' + moment(new Date(bydate1[i])).format('DD MMMM YYYY') + '</strong></td>';
                    content += '</tr>';
                    for (var j = 0; j < filter1.length; j++) {
                        if (filter1[j].tanggal.toISOString() === bydate1[i]) {
                            content += '<tr>';
                            content += '<td>' + filter1[j].registrasi + '</td>';
                            content += '<td>' + filter1[j].nama + '</td>';
                            content += '<td>' + filter1[j].umur + '</td>';
                            content += '<td style="text-align: center;">' + filter1[j].jk + '</td>';
                            content += '<td>' + filter1[j].diagnosaname + '</td>';
                            if (filter1[j].status === 'B') {
                                content += '<td style="text-align: center;">&bull;</td>';
                                content += '<td></td>';
                            } else {
                                content += '<td></td>';
                                content += '<td style="text-align: center;">&bull;</td>';
                            }
                            content += '</tr>';
                        }
                    }
                    content += '<tr>';
                    content += '<td colspan="7" style="height: 30px;"></td>';
                    content += '</tr>';
                }
            } else {
                var filter2 = _.chain(map).filter(function (val) {
                    return moment(new Date(val.tanggal)).format('MMMM') === req.params.m && moment(new Date(val.tanggal)).format('YYYY') === req.params.y && val.diagnosaid === req.params.d;
                }).value();

                var bydate2 = _.chain(filter2).map(function (val) {
                    return val.tanggal.toISOString();
                }).uniq().sortBy().value();

                for (var k = 0; k < bydate2.length; k++) {
                    content += '<tr>';
                    content += '<td colspan="7" style="background: #eee;"><strong>' + moment(new Date(bydate2[k])).format('DD MMMM YYYY') + '</strong></td>';
                    content += '</tr>';
                    for (var l = 0; l < filter2.length; l++) {
                        if (filter2[l].tanggal.toISOString() === bydate2[k]) {
                            content += '<tr>';
                            content += '<td>' + filter2[l].registrasi + '</td>';
                            content += '<td>' + filter2[l].nama + '</td>';
                            content += '<td>' + filter2[l].umur + '</td>';
                            content += '<td style="text-align: center;">' + filter2[l].jk + '</td>';
                            content += '<td>' + filter2[l].diagnosaname + '</td>';
                            if (filter2[l].status === 'B') {
                                content += '<td style="text-align: center;">&bull;</td>';
                                content += '<td></td>';
                            } else {
                                content += '<td></td>';
                                content += '<td style="text-align: center;">&bull;</td>';
                            }
                            content += '</tr>';
                        }
                    }
                    content += '<tr>';
                    content += '<td colspan="7" style="height: 30px;"></td>';
                    content += '</tr>';
                }
            }

            content += '</tbody>';
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