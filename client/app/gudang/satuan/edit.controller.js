'use strict';

class gdSatuanEditController {

    constructor(Restangular, $alert, $stateParams, $state, $modal, $scope) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.$modal = $modal;
        this.$scope = $scope;

        this.getSatuan();

        this.data = {};
        this.submitted = false;
    }

    getSatuan() {
        this.Restangular.one('satuans').customGET(this.$stateParams.id)
            .then(data => {
                this.data = data;
            });
    }

    showmodal(id) {
        this.scope = this.$scope.$new();
        this.scope.id = id;
        this.modal = this.$modal({
            templateUrl: 'app/gudang/satuan/hapus.html',
            show: false,
            scope: this.scope
        });

        this.modal.$promise.then(this.modal.show);
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('satuans').customPUT({
                    satuan: this.data.satuan
                }, this.data._id)
                .then(() => {
                    this.$state.go('gudang.satuan');
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
    .controller('gdSatuanEditController', gdSatuanEditController);