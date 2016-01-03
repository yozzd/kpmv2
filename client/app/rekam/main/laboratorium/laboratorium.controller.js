'use strict';

class RkLaboratoriumController {

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
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('laboratoriums').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('laboratoriums').customPUT({
                    hb: this.data.hb,
                    led: this.data.led,
                    leukosit: this.data.leukosit,
                    thrombosit: this.data.thrombosit,
                    erythrosit: this.data.erythrosit,
                    haematokrit: this.data.haematokrit,
                    goldarah: this.data.goldarah
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
            this.Restangular.one('laboratoriums').customPUT({
                    ph: this.data.ph,
                    reduksi: this.data.reduksi,
                    protein: this.data.protein,
                    bilirubin: this.data.bilirubin,
                    sedimen: this.data.sedimen
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
            this.Restangular.one('laboratoriums').customPUT({
                    faeces: this.data.faeces
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
            this.Restangular.one('laboratoriums').customPUT({
                    dsbta: this.data.dsbta,
                    dsbta1: this.data.dsbta1,
                    dsbta2: this.data.dsbta2,
                    dsbta3: this.data.dsbta3,
                    btatgl: this.data.btatgl,
                    btasensitif: this.data.btasensitif,
                    btaresinten: this.data.btaresinten,
                    dssputum: this.data.dssputum,
                    sputumtgl: this.data.sputumtgl,
                    sputumsensitif: this.data.sputumsensitif,
                    sputumresinten: this.data.sputumresinten,
                    jamur: this.data.jamur,
                    jamurtgl: this.data.jamurtgl,
                    kulturpleuratgl: this.data.kulturpleuratgl
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
            this.Restangular.one('laboratoriums').customPUT({
                    analisapleuratgl: this.data.analisapleuratgl,
                    rivalta: this.data.rivalta,
                    ldhpleura: this.data.ldhpleura,
                    proteinpleura: this.data.proteinpleura,
                    transudat: this.data.transudat,
                    faalhatitgl: this.data.faalhatitgl,
                    sgot: this.data.sgot,
                    sgpt: this.data.sgpt,
                    biltotal: this.data.biltotal,
                    bildirect: this.data.bildirect,
                    fosfatase: this.data.fosfatase,
                    elektrofores: this.data.elektrofores,
                    total: this.data.total,
                    faalginjaltgl: this.data.faalginjaltgl,
                    ureum: this.data.ureum,
                    kratinin: this.data.kratinin,
                    asamurat: this.data.asamurat,
                    kratininurine: this.data.kratininurine,
                    proteinurine: this.data.proteinurine,
                    elektrolittgl: this.data.elektrolittgl,
                    natrium: this.data.natrium,
                    kalium: this.data.kalium,
                    chlorida: this.data.chlorida,
                    agda: this.data.agda,
                    jantungtgl: this.data.jantungtgl,
                    ekg: this.data.ekg,
                    treadmill: this.data.treadmill,
                    cpk: this.data.cpk,
                    ldhjantung: this.data.ldhjantung,
                    troponin: this.data.troponin,
                    glukosatgl: this.data.glukosatgl,
                    glukosapuasa: this.data.glukosapuasa,
                    glukosapp: this.data.glukosapp,
                    glukosarandom: this.data.glukosarandom,
                    lipidtgl: this.data.lipidtgl,
                    hdl: this.data.hdl,
                    ldl: this.data.ldl,
                    cholesterol: this.data.cholesterol,
                    triglecerida: this.data.triglecerida,
                    lipidtotal: this.data.lipidtotal
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
    .controller('RkLaboratoriumController', RkLaboratoriumController);