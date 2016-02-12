'use strict';

class gdEditMasukController {

    constructor(Restangular, $alert, $stateParams, $state, $modal, $scope) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.$modal = $modal;
        this.$scope = $scope;

        this.getMasuk();
        this.getObat();

        this.data = {};
        this.submitted = false;
    }

    getMasuk() {
        this.Restangular.one('masuks').customGET(this.$stateParams.id)
            .then(data => {
                this.data = data;
                this.ob = {
                    selected: {
                        obat: this.data.obat
                    }
                };
            });
    }

    getObat() {
        this.Restangular.all('obats').customGETLIST()
            .then(datas => {
                this.obs = _.sortBy(datas, 'obat');
            });
    }

    showmodal(id) {
        this.scope = this.$scope.$new();
        this.scope.id = id;
        this.modal = this.$modal({
            templateUrl: 'app/gudang/masuk/hapus/hapus.html',
            show: false,
            scope: this.scope
        });

        this.modal.$promise.then(this.modal.show);
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('masuks').customPUT({
                    tanggal: this.data.tanggal,
                    id: this.ob.selected._id,
                    obat: this.ob.selected.obat,
                    satuan: this.ob.selected.satuan,
                    jumlah: this.data.jumlah
                }, this.data._id)
                .then(() => {
                    this.$state.go('gudang.masuk');
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
    .controller('gdEditMasukController', gdEditMasukController);