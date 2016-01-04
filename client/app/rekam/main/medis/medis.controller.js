'use strict';

class RkMedisController {

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
                name: 'Obstruktif'
            },
            {
                id: 2,
                name: 'Restriktif'
            },
            {
                id: 3,
                name: 'Mixed Type'
            }
        ];

        this.opt2 = [
            {
                id: 1,
                name: 'Ringan'
            },
            {
                id: 2,
                name: 'Sedang'
            },
            {
                id: 3,
                name: 'Berat'
            }
        ];

        this.opt3 = [
            {
                id: 1,
                name: 'Positif : PEFR > 20%'
            },
            {
                id: 2,
                name: 'Negatif : PEFR < 20%'
            }
        ];

        this.opt4 = [
            {
                id: 1,
                name: 'Positif PC20 > 8 mg/ml'
            },
            {
                id: 2,
                name: 'Borderline PC20 4-8 mg/ml'
            },
            {
                id: 3,
                name: 'Negatif PC20 < 4 mg/ml'
            }
        ];

        this.opt5 = [
            {
                id: 1,
                name: 'Positif'
            },
            {
                id: 2,
                name: 'Negatif'
            }
        ];

        this.opt6 = [
            {
                id: 1,
                name: '0-4 mm : Negatif'
            },
            {
                id: 2,
                name: '5-9 mm : Meragukan'
            },
            {
                id: 3,
                name: '10-15 mm : Positif'
            },
            {
                id: 4,
                name: ' >15 mm : Positif Kuat'
            }
        ];

        this.kesimpulan = {};
        this.kesimpulans = this.opt1;

        this.kkesimpulan = {};
        this.kkesimpulans = this.opt2;

        this.bronkhodilator = {};
        this.bronkhodilators = this.opt3;

        this.bronkhus = {};
        this.bronkhuss = this.opt4;

        this.skin = {};
        this.skins = this.opt5;

        this.tuberkulin = {};
        this.tuberkulins = this.opt6;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('mediss').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.kesimpulan === '') {
                        this.kesimpulan = {
                            selected: null
                        };
                    } else {
                        this.kesimpulan = {
                            selected: {
                                name: this.data.kesimpulan
                            }
                        };
                    }

                    if (this.data.kkesimpulan === '') {
                        this.kkesimpulan = {
                            selected: null
                        };
                    } else {
                        this.kkesimpulan = {
                            selected: {
                                name: this.data.kkesimpulan
                            }
                        };
                    }

                    if (this.data.bronkhodilator === '') {
                        this.bronkhodilator = {
                            selected: null
                        };
                    } else {
                        this.bronkhodilator = {
                            selected: {
                                name: this.data.bronkhodilator
                            }
                        };
                    }

                    if (this.data.bronkhus === '') {
                        this.bronkhus = {
                            selected: null
                        };
                    } else {
                        this.bronkhus = {
                            selected: {
                                name: this.data.bronkhus
                            }
                        };
                    }

                    if (this.data.skin === '') {
                        this.skin = {
                            selected: null
                        };
                    } else {
                        this.skin = {
                            selected: {
                                name: this.data.skin
                            }
                        };
                    }

                    if (this.data.tuberkulin === '') {
                        this.tuberkulin = {
                            selected: null
                        };
                    } else {
                        this.tuberkulin = {
                            selected: {
                                name: this.data.tuberkulin
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
            this.Restangular.one('mediss').customPUT({
                    bronkhoskopitgl: this.data.bronkhoskopitgl,
                    bronkhoskopihasil: this.data.bronkhoskopihasil
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
            this.Restangular.one('mediss').customPUT({
                    spirometertgl: this.data.spirometertgl,
                    evc: this.data.evc,
                    fvc: this.data.fvc,
                    fevi: this.data.fevi,
                    persenfvc: this.data.persenfvc,
                    persenfevi: this.data.persenfevi,
                    kesimpulan: this.kesimpulan.selected === null ? '' : this.kesimpulan.selected.name,
                    kkesimpulan: this.kesimpulan.selected === null ? '' : this.kkesimpulan.selected.name,
                    pefrtgl: this.data.pefrtgl,
                    pefr: this.data.pefr,
                    bronkhodilatortgl: this.data.bronkhodilatortgl,
                    bronkhodilator: this.bronkhodilator.selected === null ? '' : this.bronkhodilator.selected.name,
                    bronkhustgl: this.data.bronkhustgl,
                    bronkhus: this.bronkhus.selected === null ? '' : this.bronkhus.selected.name,
                    kbronkhus: this.bronkhus.selected === null ? '' : this.data.kbronkhus,
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

    submit3(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('mediss').customPUT({
                    ekgtgl: this.data.ekgtgl,
                    ekghasil: this.data.ekghasil,
                    treadmilltgl: this.data.treadmilltgl,
                    treadmillhasil: this.data.treadmillhasil,
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

    submit4(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('mediss').customPUT({
                    lge: this.data.lge,
                    skin: this.skin.selected === null ? '' : this.skin.selected.name,
                    kskin: this.skin.selected === null ? '' : this.data.kskin,
                    tuberkulin: this.tuberkulin.selected === null ? '' : this.tuberkulin.selected.name,
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

    submit5(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('mediss').customPUT({
                    pleuratgl: this.data.pleuratgl,
                    pleurahasil: this.data.pleurahasil
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

    submit6(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('mediss').customPUT({
                    histolitgl: this.data.histolitgl,
                    histolilokasi: this.data.histolilokasi,
                    histolibahan: this.data.histolibahan,
                    histolihasil: this.data.histolihasil
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
    .controller('RkMedisController', RkMedisController);