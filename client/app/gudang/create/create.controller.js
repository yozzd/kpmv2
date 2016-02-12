'use strict';

class gdCreateController {

    constructor(Restangular, $alert) {
        this.Restangular = Restangular;
        this.$alert = $alert;

        this.getSatuan();

        this.data = {};
        this.submitted = false;
    }

    getSatuan() {
        this.Restangular.all('satuans').customGETLIST()
            .then(datas => {
                this.st = {};
                this.sts = _.sortBy(datas, 'satuan');
            });
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.all('obats').customPOST({
                    obat: this.data.obat,
                    satuan: this.st.selected.satuan
                })
                .then(() => {
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
    .controller('gdCreateController', gdCreateController);