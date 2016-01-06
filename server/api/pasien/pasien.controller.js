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

var fs = require('bluebird').promisifyAll(require('fs-extra'));
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

export function cetak(req, res) {
    Pasien.findById(req.params.id).populate('_anamnesa').execAsync()
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

            content += '<table style="border: 0; width: 80%;">';
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

            content += '<p><strong><u>I. ANAMNESA</u></strong></p>';
            content += '<table style="border: 0; width: 80%;">';
            content += '<tr>';
            content += '<td style="width: 3%;">1.</td>';
            content += '<td colspan="2">Keluhan Utama</td>';
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