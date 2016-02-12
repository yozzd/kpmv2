'use strict';

class gdSatuanController {

    constructor(Restangular, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

        this.getSatuan();

        this.data = {};
        this.submitted = false;
    }

    getSatuan() {
        this.block.start();
        this.Restangular.all('satuans').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;
                    this.nodata = this.datas.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.all('satuans').customPOST({
                    satuan: this.data.satuan
                })
                .then(() => {
                    this.getSatuan();
                    this.$alert({
                        content: 'Data berhasil disimpan',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
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

angular.module('kpmApp.gudang')
    .controller('gdSatuanController', gdSatuanController);