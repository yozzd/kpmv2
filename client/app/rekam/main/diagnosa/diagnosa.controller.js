'use strict';

class RkDiagnosaController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

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

        this.opt2 = ['Baru', 'Kambuh', 'After Default', 'Gagal', 'Kronis'];
        this.opt3 = ['Ringan', 'Berat'];
        this.opt4 = ['Pleuritis TB (Pl. Eksudativa)', 'Meningitis TB', 'Kelenjar Regio Colli', 'Sub Mandibular', 'Axilla Dextra', 'Sinistra'];
        this.opt5 = ['< 5 Tahun', '> 5 Tahun'];
        this.opt6 = ['Primer', 'Sekunder'];
        this.opt7 = ['Partialis', 'Totalis', 'Ventil'];
        this.opt8 = ['Ringan', 'Sedang', 'Berat'];
        this.opt9 = ['Emboli Paru', 'Infark Paru'];
        this.opt10 = ['SOPT', 'Kalsifikasi', 'Fibrosis'];

        this.pd = {};
        this.pds = this.opt1;

        this.pdid1 = {};
        this.pdid1s = this.opt2;

        this.pdid2 = {};
        this.pdid2s = this.opt3;

        this.pdid4 = {};
        this.pdid4s = this.opt3;

        this.pdid4k = {};
        this.pdid4ks = this.opt4;

        this.pdid5 = {};
        this.pdid5s = this.opt5;

        this.pdid13 = {};
        this.pdid13s = this.opt6;

        this.pdid13k = {};
        this.pdid13ks = this.opt7;

        this.pdid14 = {};
        this.pdid14s = this.opt8;

        this.pdid28 = {};
        this.pdid28s = this.opt8;

        this.pdid35 = {};
        this.pdid35s = this.opt9;

        this.pdid36 = {};
        this.pdid36s = this.opt10;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('diagnosas').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.pdid) {
                        this.pd = {
                            selected: {
                                id: this.data.pdid,
                                name: this.data.pdname
                            }
                        };
                    } else {
                        this.pd = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '1') {
                        this.pdid1 = {
                            selected: this.data.pdid1
                        };
                    } else {
                        this.pdid1 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '2') {
                        this.pdid2 = {
                            selected: this.data.pdid2
                        };
                    } else {
                        this.pdid2 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '4') {
                        this.pdid4 = {
                            selected: this.data.pdid4
                        };
                        this.pdid4k = {
                            selected: this.data.pdid4k
                        };
                    } else {
                        this.pdid4 = {
                            selected: undefined
                        };
                        this.pdid4k = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '5') {
                        this.pdid5 = {
                            selected: this.data.pdid5
                        };
                    } else {
                        this.pdid5 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '13') {
                        this.pdid13 = {
                            selected: this.data.pdid13
                        };
                        this.pdid13k = {
                            selected: this.data.pdid13k
                        };
                    } else {
                        this.pdid13 = {
                            selected: undefined
                        };
                        this.pdid13k = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '14') {
                        this.pdid14 = {
                            selected: this.data.pdid14
                        };
                    } else {
                        this.pdid14 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '28') {
                        this.pdid28 = {
                            selected: this.data.pdid28
                        };
                    } else {
                        this.pdid28 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '33') {
                        this.pdid33k1 = this.data.pdid33k1;
                        this.pdid33k2 = this.data.pdid33k2;
                    }

                    if (this.data.pdid === '35') {
                        this.pdid35 = {
                            selected: this.data.pdid35
                        };
                    } else {
                        this.pdid35 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '36') {
                        this.pdid36 = {
                            selected: this.data.pdid36
                        };
                    } else {
                        this.pdid36 = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdid === '37') {
                        this.pdid37 = this.data.pdid37;
                    }

                    if (this.data.pdid === '38') {
                        this.pdid38 = this.data.pdid38;
                    }

                    this.opt11 = !this.data.pdid ? this.opt1 : _.filter(this.opt1, function (val) {
                        return val.name !== data.pdname;
                    });
                    this.sd = {};
                    this.sds = this.opt11;
                    if (this.data.sdid) {
                        this.sd = {
                            selected: {
                                id: this.data.sdid,
                                name: this.data.sdname
                            }
                        };
                        this.ksd = this.data.ksd;
                    } else {
                        this.sd = {
                            selected: undefined
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('diagnosas').customPUT({
                    pdid: this.pd.selected === undefined ? '' : this.pd.selected.id,
                    pdname: this.pd.selected === undefined ? '' : this.pd.selected.name,
                    pdid1: this.pdid1.selected === undefined ? '' : this.pdid1.selected,
                    pdid2: this.pdid2.selected === undefined ? '' : this.pdid2.selected,
                    pdid4: this.pdid4.selected === undefined ? '' : this.pdid4.selected,
                    pdid4k: this.pdid4k.selected === undefined ? '' : this.pdid4k.selected,
                    pdid5: this.pdid5.selected === undefined ? '' : this.pdid5.selected,
                    pdid13: this.pdid13.selected === undefined ? '' : this.pdid13.selected,
                    pdid13k: this.pdid13k.selected === undefined ? '' : this.pdid13k.selected,
                    pdid14: this.pdid14.selected === undefined ? '' : this.pdid14.selected,
                    pdid28: this.pdid28.selected === undefined ? '' : this.pdid28.selected,
                    pdid33k1: this.pdid33k1,
                    pdid33k2: this.pdid33k2,
                    pdid35: this.pdid35.selected === undefined ? '' : this.pdid35.selected,
                    pdid36: this.pdid36.selected === undefined ? '' : this.pdid36.selected,
                    pdid37: this.pdid37,
                    pdid38: this.pdid38,
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
        }
    }

    submit2(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('diagnosas').customPUT({
                    sdid: this.sd.selected === undefined ? '' : this.sd.selected.id,
                    sdname: this.sd.selected === undefined ? '' : this.sd.selected.name,
                    ksd: this.ksd,
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
        }
    }
}

angular.module('kpmApp.rekam')
    .controller('RkDiagnosaController', RkDiagnosaController);