'use strict';

class RCreateController {

    constructor(Restangular, $alert) {
        this.Restangular = Restangular;
        this.$alert = $alert;

        this.data = {};
        this.submitted = false;

        this.jk = {};
        this.jks = [
            {
                id: '1',
                name: 'L'
            },
            {
                id: '2',
                name: 'P'
            }
        ];
    }

    lahir(tgl) {
        this.data.umur = moment(tgl).toNow(true);
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.all('pasiens').customPOST({
                    registrasi: this.data.registrasi,
                    tanggal: this.data.tanggal,
                    nama: this.data.nama,
                    lahir: this.data.lahir,
                    umur: this.data.umur,
                    jk: this.jk.selected.name
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

angular.module('kpmApp.rekam')
    .controller('RCreateController', RCreateController);