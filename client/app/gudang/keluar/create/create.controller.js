'use strict';

class gdCreateKeluarController {

    constructor(Restangular, $alert) {
        this.Restangular = Restangular;
        this.$alert = $alert;

        this.getObat();

        this.data = {};
        this.submitted = false;
    }

    getObat() {
        this.Restangular.all('obats').customGETLIST()
            .then(datas => {
                this.ob = {};
                this.obs = _.sortBy(datas, 'obat');
            });
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.all('keluars').customPOST({
                    tanggal: this.data.tanggal,
                    id: this.ob.selected._id,
                    obat: this.ob.selected.obat,
                    satuan: this.ob.selected.satuan,
                    jumlah: this.data.jumlah
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
    .controller('gdCreateKeluarController', gdCreateKeluarController);