'use strict';

class RkRekapitulasiDaftarController {

    constructor(Restangular, blockUI, $timeout) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;

        this.opt1 = [
            {
                id: 1,
                name: 'Januari'
            },
            {
                id: 2,
                name: 'Februari'
            },
            {
                id: 3,
                name: 'Maret'
            },
            {
                id: 4,
                name: 'April'
            },
            {
                id: 5,
                name: 'Mei'
            },
            {
                id: 6,
                name: 'Juni'
            },
            {
                id: 7,
                name: 'Juli'
            },
            {
                id: 8,
                name: 'Agustus'
            },
            {
                id: 9,
                name: 'September'
            },
            {
                id: 10,
                name: 'Oktober'
            },
            {
                id: 11,
                name: 'November'
            },
            {
                id: 12,
                name: 'Desember'
            }
        ];

        this.opt2 = [
            {
                id: 0,
                name: 'Semua Diagnosa'
            },
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

        this.m = moment().format('MMMM');
        this.y = new Date().getFullYear();

        this.month = {
            selected: {
                name: this.m
            }
        };
        this.months = this.opt1;

        this.year = {
            selected: {
                name: this.y
            }
        };
        this.years = _.map(_.range(2010, this.y + 1, 1), function (v, k) {
            return {
                id: k,
                name: v.toString(),
            };
        });

        this.diag = {
            selected: {
                id: 0,
                name: 'Semua Diagnosa'
            }
        };
        this.diags = this.opt2;

        this.getPasien(this.m, this.y, this.diag.selected.id);
    }

    getPasien(m, y, d) {
        this.block.start();
        this.Restangular.all('kontrols').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;

                    this.map = _.chain(this.datas).map(function (val) {
                        return val.kontrol;
                    }).flatten().value();

                    if (d === 0) {
                        this.filter = _.chain(this.map).filter(function (val) {
                            return moment(val.tanggal).format('MMMM') === m.toString() && moment(val.tanggal).format('YYYY') === y.toString();
                        }).value();
                    } else {
                        this.filter = _.chain(this.map).filter(function (val) {
                            return moment(val.tanggal).format('MMMM') === m.toString() && moment(val.tanggal).format('YYYY') === y.toString() && val.diagnosaid === d.toString();
                        }).value();
                    }

                    this.bydate = _.chain(this.filter).map(function (val) {
                        return val.tanggal;
                    }).uniq().sortBy().value();
                    this.nodata = this.bydate.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }

    change(m, y, d) {
        this.getPasien(m, y, d);
    }
}

angular.module('kpmApp.rekam')
    .controller('RkRekapitulasiDaftarController', RkRekapitulasiDaftarController);