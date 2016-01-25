'use strict';

class RkKontrolEditController {

    constructor(Restangular, $stateParams, $alert, Upload, blockUI, $timeout, $modal, $scope) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.$modal = $modal;
        this.Upload = Upload;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.$scope = $scope;

        this.id = this.$stateParams.id;

        this.data = {};
        this.submitted = false;

        this.blockmessage = 'Loading ...';
        this.getPasien();

        this.opt1 = [
            {
                id: 1,
                name: 'TB Paru BTA Positif'
            },
            {
                id: 2,
                name: 'TB Paru BTA Negatif'
            },
            {
                id: 3,
                name: 'TB Paru Anak (Tersangka)'
            },
            {
                id: 4,
                name: 'TB Ekstra Paru'
            },
            {
                id: 5,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Pneumonia'
            },
            {
                id: 6,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Bronkhitis'
            },
            {
                id: 7,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Influenza / Flu'
            },
            {
                id: 8,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Rhinitis'
            },
            {
                id: 9,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Tonsilitis'
            },
            {
                id: 10,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Faryingitis / Tonsillofaringitis'
            },
            {
                id: 11,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Laringitis'
            },
            {
                id: 12,
                name: 'ISPA (Infeksi Saluran Pernafasan Akut) : Sinusitis'
            },
            {
                id: 13,
                name: 'Penyakit / Kelainan Pleura : Pneumothoraks'
            },
            {
                id: 14,
                name: 'Penyakit / Kelainan Pleura : Efusi Pleura (Hemathothoraks / Empyema)'
            },
            {
                id: 15,
                name: 'Penyakit / Kelainan Pleura : Hydropneumothoraks'
            },
            {
                id: 16,
                name: 'Penyakit / Kelainan Pleura : Tumor Pleura'
            },
            {
                id: 17,
                name: 'Penyakit / Kelainan Pleura : Schwarte'
            },
            {
                id: 18,
                name: 'Asma Bronkhial (Dewasa) : Intermitten'
            },
            {
                id: 19,
                name: 'Asma Bronkhial (Dewasa) : Persisten Ringan'
            },
            {
                id: 20,
                name: 'Asma Bronkhial (Dewasa) : Persisten Sedang'
            },
            {
                id: 21,
                name: 'Asma Bronkhial (Dewasa) : Persisten Berat'
            },
            {
                id: 22,
                name: 'Asma Bronkhial (Dewasa) : Eksaserbasi Berat'
            },
            {
                id: 23,
                name: 'Asma Bronkhial (Dewasa) : Status Asmaticus'
            },
            {
                id: 24,
                name: 'Asma Bronkhial (Anak) : Episodik Jarang'
            },
            {
                id: 25,
                name: 'Asma Bronkhial (Anak) : Episodik Sering'
            },
            {
                id: 26,
                name: 'Asma Bronkhial (Anak) : Asma Persisten'
            },
            {
                id: 27,
                name: 'Penyakit Paru Obstruktif Kronik (PPOK) : Stabil'
            },
            {
                id: 28,
                name: 'Penyakit Paru Obstruktif Kronik (PPOK) : Eksaserbasi Akut'
            },
            {
                id: 29,
                name: 'Cor Pulmonale Chronicum (CPC)'
            },
            {
                id: 30,
                name: 'Bronkhiektasis'
            },
            {
                id: 31,
                name: 'Atelektasis'
            },
            {
                id: 32,
                name: 'Abses Paru'
            },
            {
                id: 33,
                name: 'Tumor Paru'
            },
            {
                id: 34,
                name: 'Tumor Mediastinum'
            },
            {
                id: 35,
                name: 'Penyakit Vascular Paru'
            },
            {
                id: 36,
                name: 'Sequele Tuberkulosis'
            },
            {
                id: 37,
                name: 'Penyakit Paru / Saluran Nafas Lainnya'
            },
            {
                id: 38,
                name: 'Penyakit Non Paru / Non Saluran Nafas Lainnya'
            }
        ];

        this.diagnosa = {};
        this.diagnosas = this.opt1;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('kontrols').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = this.data._pasien.nama;

                    this.find = _.find(this.data.kontrol, {
                        _id: this.$stateParams.kid
                    });
                    this.tanggal = this.find.tanggal;
                    this.pemeriksaan = this.find.pemeriksaan;
                    this.keluhan = this.find.keluhan;
                    this.lab = this.find.lab;
                    this.sputum = this.find.sputum;
                    this.mt = this.find.mt;
                    this.bb = this.find.bb;
                    this.tb = this.find.tb;
                    this.diagnosa = {
                        selected: {
                            id: this.find.diagnosaid,
                            name: this.find.diagnosaname
                        }
                    };
                    this.terapi = this.find.terapi;

                    this.scope = this.$scope.$new();
                    this.scope.id = this.data._id;
                    this.scope.kid = this.$stateParams.kid;
                    this.modal = this.$modal({
                        templateUrl: 'app/rekam/main/kontrol/hapus/hapus.html',
                        show: false,
                        scope: this.scope
                    });

                    this.block.stop();
                }, 1000);
            });
    }

    showmodal() {
        this.modal.$promise.then(this.modal.show);
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            if (this.file === undefined) {
                this.Restangular.one('kontrols').customPUT({
                        kid: this.$stateParams.kid,
                        tanggal: this.tanggal,
                        registrasi: this.data._pasien.registrasi,
                        nama: this.data._pasien.nama,
                        umur: this.data._pasien.lahir === null ? this.umur : moment(this.data._pasien.lahir).preciseDiff(moment(this.tanggal)),
                        jk: this.data._pasien.jk,
                        keluhan: this.keluhan,
                        lab: this.lab,
                        sputum: this.sputum,
                        mt: this.mt,
                        bb: this.bb,
                        tb: this.tb,
                        diagnosaid: this.diagnosa.selected === undefined ? '' : this.diagnosa.selected.id,
                        diagnosaname: this.diagnosa.selected === undefined ? '' : this.diagnosa.selected.name,
                        terapi: this.terapi
                    }, this.data._id)
                    .then(() => {
                        this.blockmessage = 'Updating ...';
                        this.getPasien();
                    })
                    .catch(err => {
                        this.$alert({
                            content: err.data,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    });
            } else {
                this.file.upload = this.Upload.upload({
                    url: '/api/kontrols/files/update/' + this.data._id,
                    file: this.file,
                    method: 'PUT',
                    fields: {
                        kid: this.$stateParams.kid,
                        tanggal: this.tanggal === null ? '' : this.tanggal,
                        registrasi: this.data._pasien.registrasi,
                        nama: this.data._pasien.nama,
                        umur: this.data._pasien.lahir === null ? this.umur : moment(this.data._pasien.lahir).preciseDiff(moment(this.tanggal)),
                        jk: this.data._pasien.jk,
                        keluhan: this.keluhan,
                        lab: this.lab,
                        sputum: this.sputum,
                        mt: this.mt,
                        bb: this.bb,
                        tb: this.tb,
                        diagnosaid: this.diagnosa.selected === undefined ? '' : this.diagnosa.selected.id,
                        diagnosaname: this.diagnosa.selected === undefined ? '' : this.diagnosa.selected.name,
                        terapi: this.terapi
                    }
                });
                this.file.upload
                    .then(() => {
                        this.blockmessage = 'Updating ...';
                        this.getPasien();
                    });
            }
        }
    }
}

angular.module('kpmApp.rekam')
    .controller('RkKontrolEditController', RkKontrolEditController);