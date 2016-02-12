'use strict';

class SatuanHapusController {

    constructor(Restangular, $alert, $scope, $state, $timeout) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;
    }

    hapus(id) {
        this.Restangular.one('satuans').customDELETE(id)
            .then(() => {
                this.$scope.$hide();
                this.$alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'info',
                    duration: 5
                });
                this.$state.go('gudang.satuan');
            });
    }
}

angular.module('kpmApp.gudang')
    .controller('SatuanHapusController', SatuanHapusController);