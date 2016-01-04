'use strict';

class RkRehabilitasiController {

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
            1: 'Postural Drainage',
            2: 'Latihan Pernafasan Sederhana',
            3: 'Latihan Pernafasan Khusus',
            4: 'rehabilitasi Listrik'
        };
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('rehabilitasis').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.rehabilitasi === '') {
                        this.rehabilitasi = {
                            opt: []
                        };
                    } else {
                        this.rehabilitasi = {
                            opt: this.data.rehabilitasi.split(',')
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('rehabilitasis').customPUT({
                    rehabilitasi: this.rehabilitasi.opt.toString(),
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
    .controller('RkRehabilitasiController', RkRehabilitasiController);