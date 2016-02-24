'use strict';

class ApDaftarObatController {

    constructor(Restangular, blockUI, $timeout) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;

        this.getPasien();
        this.getObat();
        this.arr = [];
    }

    getPasien() {
        this.Restangular.all('pasiens').customGETLIST()
            .then(datas => {
                var arr = [];
                _.each(datas, function (v) {
                    _.each(v.resep, function (w) {
                        _.each(w.items, function (x) {
                            arr.push({
                                id: x.oid,
                                jumlah: x.jumlah
                            });
                        });
                    });
                });
                this.arr = arr;
            });
    }

    getObat() {
        this.block.start();
        this.Restangular.all('obats').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;
                    this.nodata = this.datas.length < 1;

                    var arr1 = this.arr;
                    var arr2 = [];
                    _.each(this.datas, function (v) {
                        var dd = _.chain(arr1).filter(function (w) {
                            return w.id === v._id;
                        }).pluck('jumlah').sum().value();

                        arr2.push({
                            id: v._id,
                            obat: v.obat,
                            satuan: v.satuan,
                            masuk: v.keluar,
                            terpakai: dd,
                        });
                    });
                    this.arr2 = arr2;

                    this.block.stop();
                }, 1000);
            });
    }
}

angular.module('kpmApp.apotek')
    .controller('ApDaftarObatController', ApDaftarObatController);