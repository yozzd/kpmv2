'use strict';

class ApResepCreateController {

    constructor(Restangular, $alert, $stateParams, Upload, $state) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$stateParams = $stateParams;
        this.Upload = Upload;
        this.$state = $state;

        this.getPasien();
        this.getObat();

        this.data = {};
        this.submitted = false;

        this.arr = [{
            obat: '',
            jumlah: '',
            keterangan: ''
        }];
    }

    getPasien() {
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.nama = data.nama;
            });
    }

    getObat() {
        this.Restangular.all('obats').customGETLIST()
            .then(datas => {
                this.obats = datas;
            });
    }

    tambah() {
        this.arr.push({
            obat: '',
            jumlah: '',
            keterangan: ''
        });
    }

    kurang() {
        this.arr.splice(this.arr.length - 1);
    }

    submit(form) {
        this.submitted = true;
        var items = [];
        _.each(this.arr, function (val) {
            items.push({
                oid: val.obat.selected._id,
                obat: val.obat.selected.obat,
                satuan: val.obat.selected.satuan,
                jumlah: val.jumlah,
                keterangan: val.keterangan
            });
        });
        if (form.$valid) {
            if (this.file === undefined) {
                this.Restangular.one('pasiens/rcr').customPUT({
                        tanggal: this.data.tanggal,
                        dokter: this.data.dokter,
                        items: items
                    }, this.$stateParams.id)
                    .then(() => {
                        this.$alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        this.$state.go('apotek.resep');
                    })
                    .catch(err => {
                        this.$alert({
                            content: err.data,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    });
            } else {
                this.file.upload = this.Upload.upload({
                    url: '/api/pasiens/rcrimg/' + this.$stateParams.id,
                    file: this.file,
                    method: 'PUT',
                    fields: {
                        tanggal: this.data.tanggal,
                        dokter: this.data.dokter,
                        items: items
                    }
                });
                this.file.upload
                    .then(() => {
                        this.$alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        this.$state.go('apotek.resep');
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
}

angular.module('kpmApp.apotek')
    .controller('ApResepCreateController', ApResepCreateController);