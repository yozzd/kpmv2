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
var Kontrol = require('../kontrol/kontrol.model');

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
                    })
                    .then(saved => {
                        var newKontrol = new Kontrol({
                            _pasien: saved[0]._id
                        });
                        newKontrol.saveAsync();
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
        .then(saved => {
            return Kontrol.findOneAsync({
                    _pasien: saved._id
                })
                .then(find => {
                    if (!find.kontrol[0]) {
                        find.kontrol.push({
                            pid: saved._id,
                            tanggal: saved.tanggal,
                            registrasi: saved.registrasi,
                            nama: saved.nama,
                            umur: saved.umur,
                            jk: saved.jk,
                            status: 'B',
                        });
                        return find.saveAsync();
                    } else {
                        find.kontrol[0].pid = saved._id;
                        find.kontrol[0].tanggal = saved.tanggal;
                        find.kontrol[0].registrasi = saved.registrasi;
                        find.kontrol[0].nama = saved.nama;
                        find.kontrol[0].umur = saved.umur;
                        find.kontrol[0].jk = saved.jk;
                        find.kontrol[0].status = 'B';
                        return find.saveAsync();
                    }
                });
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

// Deletes a Pasien from the DB
export function destroy(req, res) {
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .then(() => {
            fs.removeAsync('./client/app/rekam/main/files/' + req.params.id)
        })
        .then(() => {
            Anamnesa.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Fisik.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Radiologi.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Laboratorium.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Medis.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Diagnosa.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Pengobatan.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Terapi.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Rehabilitasi.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Konsultasi.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Usul.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .then(() => {
            Kontrol.findOneAsync({
                    _pasien: req.params.id
                })
                .then(pasien => {
                    pasien.removeAsync()
                })
        })
        .catch(handleError(res));
}

export function rcr(req, res) {
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(data => {
            data.resep.push({
                tanggal: req.body.tanggal,
                dokter: req.body.dokter,
                items: req.body.items
            })
            return data.saveAsync();
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function rcrimg(req, res) {
    var name = _.kebabCase(req.files.file.name.split('.')[0]) + '.' + req.files.file.name.split('.')[1].toLowerCase();

    if (req.body._id) {
        delete req.body._id;
    }
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(data => {
            return fs.ensureDirAsync('./client/app/apotek/resep/images/' + data._id)
                .then(() => {
                    return data;
                });
        })
        .then(data => {
            easyimg.exec('convert -thumbnail 80 ' + req.files.file.path + './client/app/apotek/resep/images/' + data._id + '/thumb-' + name);
            return data;
        })
        .then(data => {
            easyimg.exec('convert ' + req.files.file.path + './client/app/apotek/resep/images/' + data._id + '/' + name);
            return data;
        })
        .then(data => {
            data.resep.push({
                tanggal: req.body.tanggal,
                dokter: req.body.dokter,
                items: req.body.items,
                image: name
            })
            return data.saveAsync();
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function rup(req, res) {

    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(data => {

            var index = _.chain(data.resep).findIndex(function (v) {
                return v._id.toString() === req.body.tid;
            }).value();

            data.resep[index].tanggal = req.body.tanggal;
            data.resep[index].dokter = req.body.dokter;
            data.resep[index].items = req.body.items;
            data.saveAsync();

            return data;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function rupimg(req, res) {
    var name = _.kebabCase(req.files.file.name.split('.')[0]) + '.' + req.files.file.name.split('.')[1].toLowerCase();

    if (req.body._id) {
        delete req.body._id;
    }
    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(data => {
            return fs.ensureDirAsync('./client/app/apotek/resep/images/' + data._id)
                .then(() => {
                    return data;
                });
        })
        .then(data => {
            easyimg.exec('convert -thumbnail 80 ' + req.files.file.path + './client/app/apotek/resep/images/' + data._id + '/thumb-' + name);
            return data;
        })
        .then(data => {
            easyimg.exec('convert ' + req.files.file.path + './client/app/apotek/resep/images/' + data._id + '/' + name);
            return data;
        })
        .then(data => {

            var index = _.chain(data.resep).findIndex(function (v) {
                return v._id.toString() === req.body.tid;
            }).value();

            data.resep[index].tanggal = req.body.tanggal;
            data.resep[index].dokter = req.body.dokter;
            data.resep[index].items = req.body.items;
            data.resep[index].image = name;
            data.saveAsync();

            return data;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function rdel(req, res) {

    Pasien.findByIdAsync(req.params.id)
        .then(handleEntityNotFound(res))
        .then(data => {

            var filter = _.chain(data.resep).filter(function (v) {
                return v._id.toString() === req.body.id;
            }).value();

            if (filter[0].image) {
                return fs.removeAsync('./client/app/apotek/resep/images/' + data._id + '/' + filter[0].image)
                    .then(() => {
                        fs.removeAsync('./client/app/apotek/resep/images/' + data._id + '/thumb-' + filter[0].image);
                        return data;
                    })
            } else {
                return data;
            }
        })
        .then(data => {
            data.resep.pull(req.body.id);
            data.saveAsync();

            return data;
        })
        .then(responseWithResult(res))
        .catch(handleError(res));
}

export function cetak(req, res) {
    Pasien.findById(req.params.id).populate('_anamnesa _fisik _radiologi _laboratorium _medis _diagnosa _pengobatan _terapi _rehabilitasi _konsultasi _usul').execAsync()
        .then(pasien => {

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

            content += '<div style="text-align: center;">';
            content += '<h3>KESEHATAN PARU MASYARAKAT (KPM)<br/>UPT. DINAS KESEHATAN PROVINSI SUMATERA UTARA</h3>';
            content += '<p><strong><u>KARTU STATUS PASIEN RAWAT JALAN</u></strong></p>';
            content += '</div>';

            content += '<table align="right" style="border: 0; width: 150px; margin-bottom: 20px;">';
            content += '<tr>';
            content += '<td>Nomor</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.registrasi + '</td>';
            content += '</tr>';
            content += '<td>Tanggal</td>';
            content += '<td>:</td>';
            content += '<td>' + moment(pasien.tanggal).format('DD MMMM YYYY') + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td colspan="2">Nama</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.nama + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Umur</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.umur + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Jenis Kelamin</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.jk + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Alamat</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style="width: 2%;">-</td>';
            content += '<td>Jalan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.jalan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Lingkungan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.lingkungan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Kelurahan / Kecamatan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.kelkec + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Kota / Kabupaten</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.kotakab + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Provinsi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.provinsi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>No. Telp. / HP</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.telp + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Suku</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.suku + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Agama</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.agama + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Pekerjaan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.pekerjaan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Status Keluarga</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.sk + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Dikirim / Konsul dari</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.dikirim + ' ' + pasien.kdikirim + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan="2">Pembiayaan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien.pembiayaan + ' ' + pasien.kpembiayaan + '</td>';
            content += '</tr>';
            content += '</table>';

            //anamnesa
            content += '<p><strong><u>I. ANAMNESA</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">Keluhan Utama</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Batuk</td>';
            content += '<td style="width: 2%;">:</td>';
            content += '<td>' + pasien._anamnesa.batuk + '</td>';
            content += '</tr>'
            if (pasien._anamnesa.batuk === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.lamabatuk + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.intensitasbatuk + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Frekuensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.frekuensibatuk + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Batuk Darah</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.batukdarah + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.batukdarah === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.lamabatukdarah + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.intensitasbatukdarah + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Volume</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.volumebatukdarah + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Sesak Napas</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.sesak + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.sesak === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.lamasesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sifat Sesak</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.sifatsesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.intensitassesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Frekuensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.frekuensisesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Mengi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.mengisesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Bertambah di malam hari</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.bertambah1sesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Bertambah pada waktu aktifitas fisik</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.bertambah2sesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Faktor Pencetus</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.faktorsesak + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Dahak</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.dahak + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.dahak === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Volume</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.volumedahak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Warna</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.warnadahak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Konsistensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.konsistensidahak + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Nyeri Dada</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.nyeri + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.nyeri === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Lokasi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.lokasinyeri + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">Keluhan Tambahan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>a.</td>';
            content += '<td>Demam</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.demam + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.demam === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.lamademam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Pagi / Siang</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.pagisiangdemam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sore</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.soredemam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Malam</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.malamdemam + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Keringat Malam</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.keringat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Nafsu makan / BB menurun</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.nafsu + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Badan lemah / Tidak enak badan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.lemah + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Lain-lain</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.lain + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>3.</td>';
            content += '<td colspan="2">Riwayat Penyakit Sebelumnya</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.penyakit.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>4.</td>';
            content += '<td colspan="2">Riwayat Pengobatan Sebelumnya</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.pengobatan + '</td>';
            content += '</tr>';

            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">Gravida (Hamil)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.gravida + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.gravida === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td colspan="2">Usia Kehamilan Trimester</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.trimester + '</td>';
                content += '</tr>';
            }

            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">Kebiasaan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>a.</td>';
            content += '<td>Merokok</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Lama</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.lamamerokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.lamamerokok + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Jenis</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.jenisrokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.jenisrokok + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Banyak</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.banyakrokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.banyakrokok + ' btg/hari</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Usia mulai merokok</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.usiamerokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.usiamerokok + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Obat-obatan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Lama</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.lamaobat === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.lamaobat + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Jenis</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.jenisobat === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.jenisobat + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Alkohol</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Lama</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.lamaalkohol === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.lamaalkohol + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Jenis</td>';
            content += '<td>:</td>';
            if (pasien._anamnesa.jenisalkohol === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._anamnesa.jenisalkohol + '</td>';
            }
            content += '</tr>';

            content += '<tr>';
            content += '<td>7.</td>';
            content += '<td colspan="2">Anamnesa Keluarga</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>a.</td>';
            content += '<td>Penderita TBC Paru</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.tbcparu + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.tbcparu === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Jika Ya Siapa</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.tbcparuya + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Riwayat Asma pada Keluarga</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._anamnesa.asma + '</td>';
            content += '</tr>';
            if (pasien._anamnesa.asma === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Jika Ya Siapa</td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._anamnesa.asmaya + '</td>';
                content += '</tr>';
            }
            content += '</table>';

            //fisik
            content += '<p><strong><u>II. FISIK DIAGNOSTIK</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">Keadaan Umum</td>';
            content += '<td style="width: 2%;">:</td>';
            content += '<td>' + pasien._fisik.keadaan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">Kesadaran</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.kesadaran + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>3.</td>';
            content += '<td colspan="2">Frekuensi Pernafasan (RR)</td>';
            content += '<td>:</td>';
            if (pasien._fisik.frekuensi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._fisik.frekuensi + ' x/menit</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td>4.</td>';
            content += '<td colspan="2">Pols / Nadi</td>';
            content += '<td>:</td>';
            if (pasien._fisik.nadi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._fisik.nadi + ' x/menit</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">Suhu Tubuh (Temperatur)</td>';
            content += '<td>:</td>';
            if (pasien._fisik.suhu === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._fisik.suhu + ' <sup>o</sup>C</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td>6.</td>';
            content += '<td colspan="2">Dispnoe</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.dispnoe + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>7.</td>';
            content += '<td colspan="2">Orthopnoe</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.orthopnoe + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>8.</td>';
            content += '<td colspan="2">Odem Pre Tibial / Pre Orbital</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.odem + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>9.</td>';
            content += '<td colspan="2">Lain-lain</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.lain.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>10.</td>';
            content += '<td colspan="2">Dada</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Paru</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Inspeksi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.inspeksi + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Palpasi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.palpasi + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Perkusi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.perkusi + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Auskultasi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.auskultasi + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Cor</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>HR</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.hr + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>ST</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.st + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Abdomen</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.abdomen + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Hepar</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.hepar + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Limpa</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.limpa + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td></td>';
            content += '<td>f.</td>';
            content += '<td>Extrimitas</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.extrimitas + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td>11.</td>';
            content += '<td colspan="2">Anemis</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.anemis + '</td>';
            content += '</tr>'
            content += '<tr>';
            content += '<td>12.</td>';
            content += '<td colspan="2">Sianosis</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.sianosis + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>12.</td>';
            content += '<td colspan="2">Ikhterus</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._fisik.ikhterus + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>13.</td>';
            content += '<td colspan="2">Berat Badan</td>';
            content += '<td>:</td>';
            if (pasien._fisik.berat === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._fisik.berat + ' kg</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td>14.</td>';
            content += '<td colspan="2">Tinggi Badan</td>';
            content += '<td>:</td>';
            if (pasien._fisik.tinggi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._fisik.tinggi + ' cm</td>';
            }
            content += '</tr>';
            content += '</table>';

            //radiologi
            content += '<p><strong><u>II. PEMERIKSAAN RADIOLOGI</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">b.</td>';
            content += '<td colspan="2" style="width: 47%;">Thorak PA / Bilateral (Tgl)</td>';
            content += '<td style="width: 2%;">:</td>';
            if (pasien._radiologi.thorakpatgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._radiologi.thorakpatgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._radiologi.thorakpahasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td >c.</td>';
            content += '<td colspan="2">CT Scan Thorak (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._radiologi.thorakcttgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._radiologi.thorakcttgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._radiologi.thorakcthasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td >d.</td>';
            content += '<td colspan="2">USG Thorak (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._radiologi.thorakusgtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._radiologi.thorakusgtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._radiologi.thorakusghasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '</table>';

            //laboratorium
            content += '<p><strong><u>IV. PEMERIKSAAN LABORATORIUM</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">Darah Rutin / Lengkap</td>';
            content += '<td style="width: 2%;"></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Hb</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.hb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>LED</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.led + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Leukosit</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.leukosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Thrombosit</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.thrombosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Erythrosit</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.erythrosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>f.</td>';
            content += '<td>Haematokrit (Ht)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.haematokrit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>g.</td>';
            content += '<td>Gologan Darah</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.goldarah + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">Urine Rutin / Lengkap</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Ph</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ph + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Reduksi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.reduksi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Protein</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.protein + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Bilirubin</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.bilirubin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Sedimen</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.sedimen + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>3.</td>';
            content += '<td colspan="2">Faeces Rutin</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.faeces + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>4.</td>';
            content += '<td colspan="2">Mikrobiologi</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Direct Smear BTA (SPS)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.dsbta + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>I</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.dsbta1 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>II</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.dsbta2 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>III</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.dsbta3 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Kultur / Resistensi BTA (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.btatgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.btatgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Sensitif</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.btasensitif + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Resinten</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.btaresinten + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Direct Smear (Gran) Sputum</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.dssputum + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Kultur / Resistensi Sputum (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.sputumtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.sputumtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Sensitif</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.sputumsensitif + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Resinten</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.sputumresinten + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Direct (Jamur / Spora)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.jamur + '</td>'; + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Kultur Jamur (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.jamurtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.jamurtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Kultur Cairan Pleura (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.kulturpleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.kulturpleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">Kimia Klinik</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Analisa Cairan Pleura (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.analisapleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.analisapleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Tes Rivalta</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.rivalta + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>LDH</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ldhpleura + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Protein</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.proteinpleura + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Transudat / Exudat</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.transudat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Faal Hati (LFT) (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.faalhatitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.faalhatitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>SGOT</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.sgot + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>SGPT</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.sgpt + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Bil. Total Direct</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.biltotal + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Bil. Direct</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.bildirect + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Alkali Fosfatase</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.fosfatase + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Protein Elektrofores (SPE)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.elektrofores + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Total Protein</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.total + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Faal Ginjal (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.faalginjaltgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.faalginjaltgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Ureum</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ureum + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Kratinin</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.kratinin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Asam Urat</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.asamurat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Kratinin Urine</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.kratininurine + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Protein Urine 24 Jam</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.proteinurine + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>e.</td>';
            content += '<td>Elektrolit Darah (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.elektrolittgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.elektrolittgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Natrium</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.natrium + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Kalium</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.kalium + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Chlorida</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.chlorida + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>AGDA</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.agda + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>f.</td>';
            content += '<td>Profil Jantung (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.jantungtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.jantungtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>EKG</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ekg + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Treadmill</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.treadmill + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>CPK / CK - Nac</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.cpk + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>LDH</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ldhjantung + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Troponin I</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.troponin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>g.</td>';
            content += '<td>Tes Gula Darah (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.glukosatgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.glukosatgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Glukosa Puasa</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.glukosapuasa + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Glukosa 2 Jam PP</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.glukosapp + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Glukosa Ad Random</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.glukosarandom + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>h.</td>';
            content += '<td>Profil Lipid (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._laboratorium.lipidtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._laboratorium.lipidtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>HDL Cholesterol</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.hdl + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>LDL Cholesterol</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.ldl + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Cholesterol Total</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.cholesterol + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Triglecerida</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.triglecerida + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Lipid Total</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._laboratorium.lipidtotal + '</td>';
            content += '</tr>';
            content += '</table>';

            //medis
            content += '<p><strong><u>V. PEMERIKSAAN / TINDAKAN MEDIS DIAGNOSTIK</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">Bronkhoskopi (Tgl)</td>';
            content += '<td style="width: 2%;">:</td>';
            if (pasien._medis.bronkhoskopitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.bronkhoskopitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.bronkhoskopihasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">Tes Fungsi Paru</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Spirometer (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.spirometertgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.spirometertgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>EVC</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.evc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>FVC (KVP)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.fvc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>FEVI (VEPI)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.fevi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>%FVC (%KVP)</td>';
            content += '<td>:</td>';
            if (pasien._medis.persenfvc === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._medis.persenfvc + ' %</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>%FEVI (%VEPI)</td>';
            content += '<td>:</td>';
            if (pasien._medis.persenfevi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasien._medis.persenfevi + ' %</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td><u>Kesimpulan</u></td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>' + pasien._medis.kesimpulan + '</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.kkesimpulan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>PEFR (APE) (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.pefrtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.pefrtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasien._medis.pefr !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._medis.pefr + ' L/menit</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Tes Bronkhodilator (Uji Bronkhodilator) (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.bronkhodilatortgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.bronkhodilatortgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasien._medis.bronkhodilator !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._medis.bronkhodilator + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td>d.</td>';
            content += '<td>Tes Provokasi Bronkhus (Uji Kepekaan Bronkhus) (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.bronkhustgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.bronkhustgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasien._medis.bronkhus !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>:</td>';
                content += '<td>' + pasien._medis.bronkhus + ' : ' + pasien._medis.kbronkhus + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td>3.</td>';
            content += '<td colspan="2">Pemeriksaan Jantung</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>a.</td>';
            content += '<td>Elektrokardiograf (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.ekgtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.ekgtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.ekghasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Tes Treadmill (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.treadmilltgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.treadmilltgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.treadmillhasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>4.</td>';
            content += '<td colspan="2">Immunologi</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>a.</td>';
            content += '<td>LGE Total</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.lge + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Tes Alergi Kulit (Skin Test)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.skin + ' : ' + pasien._medis.kskin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>c.</td>';
            content += '<td>Tes Tuberkulin (Mantoux Test)</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.tuberkulin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">Proof Punctie Pleura (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.pleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.pleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.pleurahasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>6.</td>';
            content += '<td colspan="2">Histoli, Sitologi (Biopsi Jarum Halus, Biopsi Aspirsi, dsb.) (Tgl)</td>';
            content += '<td>:</td>';
            if (pasien._medis.histolitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasien._medis.histolitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Lokasi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.histolilokasi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Bahan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.histolibahan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td colspan="2">Hasil</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._medis.histolihasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '</table>';

            //diagnosa
            content += '<p><strong><u>VI. DIAGNOSA</u></strong></p>';
            content += '<table style="border: 0;">';

            if (pasien._diagnosa.pdid) {
                content += '<tr>';
                content += '<td colspan="3"><u>Diagnosa Primer</u></td>';
                content += '</tr>';
                if (pasien._diagnosa.pdid === '1') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid1 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '2') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid2 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '4') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid4 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td></td>';
                    content += '<td>-</td>';
                    content += '<td>Lokasi : ' + pasien._diagnosa.pdid4k + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '5') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid5 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '13') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid13 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td></td>';
                    content += '<td>-</td>';
                    content += '<td>' + pasien._diagnosa.pdid13k + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '14') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid14 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '28') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid28 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '33') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>Tipe / Jenis Sel : ' + pasien._diagnosa.pdid33k1 + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td></td>';
                    content += '<td>-</td>';
                    content += '<td>Stadium : ' + pasien._diagnosa.pdid33k2 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '35') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid35 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '36') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid36 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '37') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid37 + '</td>';
                    content += '</tr>';
                } else if (pasien._diagnosa.pdid === '38') {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                    content += '<tr>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td style="width: 2%">-</td>';
                    content += '<td>' + pasien._diagnosa.pdid38 + '</td>';
                    content += '</tr>';
                } else {
                    content += '<tr>';
                    content += '<td colspan="3">' + pasien._diagnosa.pdname + '</td>';
                    content += '</tr>';
                }
            }
            if (pasien._diagnosa.sdid) {
                content += '<tr>';
                content += '<td colspan="3"><u>Diagnosa Sekunder</u></td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td colspan="3">' + pasien._diagnosa.sdname + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td colspan="2"></td>';
                content += '<td>' + pasien._diagnosa.ksd.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
                content += '</tr>';
            }

            content += '</table>';

            //pengobatan
            content += '<p><strong><u>VII. PENGOBATAN</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">TB - OAT</td>';
            content += '<td style="width: 2%;"></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style="width: 3%;">a.</td>';
            content += '<td>Kategori</td>';
            content += '<td>:</td>';
            content += '<td>' + pasien._pengobatan.tb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td>b.</td>';
            content += '<td>Obat Lain-lain</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>1. ' + pasien._pengobatan.tb1 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>2. ' + pasien._pengobatan.tb2 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>3. ' + pasien._pengobatan.tb3 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>4. ' + pasien._pengobatan.tb1 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>5. ' + pasien._pengobatan.tb5 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">Non TB</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>1. ' + pasien._pengobatan.nontb1 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>2. ' + pasien._pengobatan.nontb2 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>3. ' + pasien._pengobatan.nontb3 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>4. ' + pasien._pengobatan.nontb4 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>5. ' + pasien._pengobatan.nontb5 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '</table>';

            //terapi
            content += '<p><strong><u>VIII. TINDAKAN MEDIK TERAPI</u></strong></p>';

            if (pasien._terapi.terapi) {
                var str1 = pasien._terapi.terapi.split(',');
                var str2 = ['', 'Nebulizer', 'Punctie Pleura', 'Water Sealed Drainage (WSD)', 'Pleurodesis'];

                content += '<table style="border: 0;">';
                _.each(str1, function (val, key) {
                    if (val === '2') {
                        content += '<tr>';
                        content += '<td style="width: 3%;">' + (key + 1) + '.</td>';
                        content += '<td colspan="2" style="width: 47%;">' + str2[val] + '</td>';
                        content += '<td style="width: 2%;"></td>';
                        content += '<td></td>';
                        content += '</tr>';
                        content += '<tr>';
                        content += '<td></td>';
                        content += '<td colspan="2">' + pasien._terapi.punctie + '</td>';
                        content += '<td>:</td>';
                        content += '<td>' + pasien._terapi.kpunctie + '</td>';
                        content += '</tr>';
                    } else {
                        content += '<tr>';
                        content += '<td style="width: 3%;">' + (key + 1) + '.</td>';
                        content += '<td colspan="2" style="width: 47%;">' + str2[val] + '</td>';
                        content += '<td style="width: 2%;"></td>';
                        content += '<td></td>';
                        content += '</tr>';
                    }
                });
                content += '</table>';
            }

            //rehabilitasi
            content += '<p><strong><u>IX. REHABILITASI MEDIK</u></strong></p>';

            if (pasien._rehabilitasi.rehabilitasi) {
                var str3 = pasien._rehabilitasi.rehabilitasi.split(',');
                var str4 = ['', 'Postural Drainage', 'Latihan Pernafasan Sederhana', 'Latihan Pernafasan Khusus', 'Terapi Listrik'];

                content += '<table style="border: 0;">';
                _.each(str3, function (val, key) {
                    content += '<tr>';
                    content += '<td style="width: 3%;">' + (key + 1) + '.</td>';
                    content += '<td colspan="2" style="width: 47%;">' + str4[val] + '</td>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td></td>';
                    content += '</tr>';
                });
                content += '</table>';
            }

            //konsultasi
            content += '<p><strong><u>X. KONSULTASI KHUSUS</u></strong></p>';

            if (pasien._konsultasi.konsultasi) {
                var str5 = pasien._konsultasi.konsultasi.split(',');
                var str6 = ['', 'Kesehatan Paru dan Konsulen Gizi', 'VCT', 'Berhenti Merokok'];

                content += '<table style="border: 0;">';
                _.each(str5, function (val, key) {
                    content += '<tr>';
                    content += '<td style="width: 3%;">' + (key + 1) + '.</td>';
                    content += '<td colspan="2" style="width: 47%;">' + str6[val] + '</td>';
                    content += '<td style="width: 2%;"></td>';
                    content += '<td></td>';
                    content += '</tr>';
                });
                content += '</table>';
            }

            //usul
            content += '<p><strong><u>XI. USUL / TINDAKAN LANJUT</u></strong></p>';
            content += '<table style="border: 0;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2" style="width: 47%;">' + pasien._usul.usul1 + '</td>';
            content += '<td style="width: 2%;"></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>2.</td>';
            content += '<td colspan="2">' + pasien._usul.usul2 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>3.</td>';
            content += '<td colspan="2">' + pasien._usul.usul3 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>4.</td>';
            content += '<td colspan="2">' + pasien._usul.usul4 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>5.</td>';
            content += '<td colspan="2">' + pasien._usul.usul5 + '</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
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