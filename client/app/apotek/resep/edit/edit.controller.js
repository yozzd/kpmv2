'use strict';

class ApResepEditController {

    constructor(Restangular, $alert, $stateParams, Upload, $modal, $scope) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$stateParams = $stateParams;
        this.Upload = Upload;
        this.$modal = $modal;
        this.$scope = $scope;

        this.id = this.$stateParams.id;
        this.getPasien(this.$stateParams.tid);
        this.getObat();

        this.data = {};
        this.submitted = false;
    }

    getPasien(tid) {
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.nama = data.nama;

                var find = _.chain(data.resep).filter(function (v) {
                    return v._id === tid;
                }).value();

                this.data = {
                    _id: find[0]._id,
                    tanggal: find[0].tanggal,
                    dokter: find[0].dokter,
                    image: find[0].image
                };

                var arr = [];
                _.each(find[0].items, function (val) {
                    arr.push({
                        obat: {
                            selected: {
                                _id: val.oid,
                                obat: val.obat,
                                satuan: val.satuan
                            }
                        },
                        jumlah: val.jumlah,
                        keterangan: val.keterangan
                    });
                });
                this.arr = arr;
            });
    }

    getObat() {
        this.Restangular.all('keluars').customGETLIST()
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
                this.Restangular.one('pasiens/rup').customPUT({
                        tanggal: this.data.tanggal,
                        dokter: this.data.dokter,
                        items: items,
                        tid: this.$stateParams.tid
                    }, this.$stateParams.id)
                    .then(() => {
                        this.$alert({
                            content: 'Data berhasil diupdate',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        this.getPasien(this.$stateParams.tid);
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
                    url: '/api/pasiens/rupimg/' + this.$stateParams.id,
                    file: this.file,
                    method: 'PUT',
                    fields: {
                        tanggal: this.data.tanggal,
                        dokter: this.data.dokter,
                        items: items,
                        tid: this.$stateParams.tid
                    }
                });
                this.file.upload
                    .then(() => {
                        this.$alert({
                            content: 'Data berhasil diupdate',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        this.getPasien(this.$stateParams.tid);
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

    showmodal(id) {
        this.scope = this.$scope.$new();
        this.scope.id = id;
        this.modal = this.$modal({
            templateUrl: 'app/apotek/resep/hapus/hapus.html',
            show: false,
            scope: this.scope
        });

        this.modal.$promise.then(this.modal.show);
    }
}

angular.module('kpmApp.apotek')
    .controller('ApResepEditController', ApResepEditController);