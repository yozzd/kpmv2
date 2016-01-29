'use strict';

class PasienHapusController {

    constructor(Restangular, $alert, $scope, $state, $timeout) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$state = $state;
        this.$timeout = $timeout;
    }

    hapus(id) {
        this.Restangular.one('pasiens').customDELETE(id)
            .then(() => {
                this.$scope.$hide();
                this.$alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                this.$state.go('rekam');
            });
    }
}

angular.module('kpmApp.rekam')
    .controller('PasienHapusController', PasienHapusController);