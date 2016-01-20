'use strict';

class PasienHapusController {

    constructor(Restangular, $alert, $scope, $state) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$state = $state;
    }

    hapus(id) {
        this.Restangular.one('pasiens').customDELETE(id)
            .then(() => {
                this.$scope.$hide();
                this.$state.go(this.$state.current, {}, {
                    reload: true
                });
                this.$alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
            });
    }
}

angular.module('kpmApp')
    .controller('PasienHapusController', PasienHapusController);