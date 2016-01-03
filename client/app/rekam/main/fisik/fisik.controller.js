'use strict';

class RkFisikDiagnostikController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

        this.data = {};
        this.submitted = false;

        this.blockmessage = 'Loading ...';
        this.getPasien();

        this.opt1 = [
            {
                id: 1,
                name: 'Baik'
            },
            {
                id: 2,
                name: 'Sedang'
            },
            {
                id: 3,
                name: 'Jelek'
            }
        ];
        this.opt2 = [
            {
                id: 1,
                name: 'CM'
            },
            {
                id: 2,
                name: 'CM Lemah'
            },
            {
                id: 3,
                name: 'Somnolen'
            },
            {
                id: 4,
                name: 'Soporous'
            },
            {
                id: 5,
                name: 'Coma'
            }
        ];
        this.opt3 = [
            {
                id: 1,
                name: 'Ya'
            },
            {
                id: 2,
                name: 'Tidak'
            }
        ];

        //keadaan
        this.keadaan = {};
        this.keadaans = this.opt1;

        //kesadaran
        this.kesadaran = {};
        this.kesadarans = this.opt2;

        //dispnoe
        this.dispnoe = {};
        this.dispnoes = this.opt3;

        //orthopnoe
        this.orthopnoe = {};
        this.orthopnoes = this.opt3;

        //odem
        this.odem = {};
        this.odems = this.opt3;

        //anemis
        this.anemis = {};
        this.anemiss = this.opt3;

        //sianosis
        this.sianosis = {};
        this.sianosiss = this.opt3;

        //ikhterus
        this.ikhterus = {};
        this.ikhteruss = this.opt3;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('fisiks').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    //keadaan
                    if (this.data.keadaan === '') {
                        this.keadaan = {
                            selected: null
                        };
                    } else {
                        this.keadaan = {
                            selected: {
                                name: this.data.keadaan
                            }
                        };
                    }

                    //kesadaran
                    if (this.data.kesadaran === '') {
                        this.kesadaran = {
                            selected: null
                        };
                    } else {
                        this.kesadaran = {
                            selected: {
                                name: this.data.kesadaran
                            }
                        };
                    }

                    //dispnoe
                    if (this.data.dispnoe === '') {
                        this.dispnoe = {
                            selected: null
                        };
                    } else {
                        this.dispnoe = {
                            selected: {
                                name: this.data.dispnoe
                            }
                        };
                    }

                    //orthopnoe
                    if (this.data.orthopnoe === '') {
                        this.orthopnoe = {
                            selected: null
                        };
                    } else {
                        this.orthopnoe = {
                            selected: {
                                name: this.data.orthopnoe
                            }
                        };
                    }

                    //odem
                    if (this.data.odem === '') {
                        this.odem = {
                            selected: null
                        };
                    } else {
                        this.odem = {
                            selected: {
                                name: this.data.odem
                            }
                        };
                    }

                    //anemis
                    if (this.data.anemis === '') {
                        this.anemis = {
                            selected: null
                        };
                    } else {
                        this.anemis = {
                            selected: {
                                name: this.data.anemis
                            }
                        };
                    }

                    //sianosis
                    if (this.data.sianosis === '') {
                        this.sianosis = {
                            selected: null
                        };
                    } else {
                        this.sianosis = {
                            selected: {
                                name: this.data.sianosis
                            }
                        };
                    }

                    //ikhterus
                    if (this.data.ikhterus === '') {
                        this.ikhterus = {
                            selected: null
                        };
                    } else {
                        this.ikhterus = {
                            selected: {
                                name: this.data.ikhterus
                            }
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('fisiks').customPUT({
                    keadaan: this.keadaan.selected === null ? '' : this.keadaan.selected.name,
                    kesadaran: this.kesadaran.selected === null ? '' : this.kesadaran.selected.name,
                    frekuensi: this.data.frekuensi,
                    nadi: this.data.nadi,
                    suhu: this.data.suhu,
                    dispnoe: this.dispnoe.selected === null ? '' : this.dispnoe.selected.name,
                    orthopnoe: this.orthopnoe.selected === null ? '' : this.orthopnoe.selected.name,
                    odem: this.odem.selected === null ? '' : this.odem.selected.name,
                    lain: this.data.lain,
                    inspeksi: this.data.inspeksi,
                    palpasi: this.data.palpasi,
                    perkusi: this.data.perkusi,
                    auskultasi: this.data.auskultasi,
                    hr: this.data.hr,
                    st: this.data.st,
                    abdomen: this.data.abdomen,
                    hepar: this.data.hepar,
                    limpa: this.data.limpa,
                    extrimitas: this.data.extrimitas,
                    anemis: this.anemis.selected === null ? '' : this.anemis.selected.name,
                    sianosis: this.sianosis.selected === null ? '' : this.sianosis.selected.name,
                    ikhterus: this.ikhterus.selected === null ? '' : this.ikhterus.selected.name,
                    berat: this.data.berat,
                    tinggi: this.data.tinggi
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
    .controller('RkFisikDiagnostikController', RkFisikDiagnostikController);