'use strict';

class RkKonsultasiController {

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

        this.opt = {
            1: 'Kesehatan Paru dan Konsulen Gizi',
            2: 'VCT',
            3: 'Berhenti Merokok',
        };
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('konsultasis').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.konsultasi === '') {
                        this.konsultasi = {
                            opt: []
                        };
                    } else {
                        this.konsultasi = {
                            opt: this.data.konsultasi.split(',')
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('konsultasis').customPUT({
                    konsultasi: this.konsultasi.opt.toString(),
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
    .controller('RkKonsultasiController', RkKonsultasiController);