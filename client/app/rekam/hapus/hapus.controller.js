'use strict';

class PasienHapusController {

    constructor(Restangular, $alert, $scope, $window, $timeout) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$window = $window;
        this.$timeout = $timeout;
    }

    hapus(id) {
        this.Restangular.one('pasiens').customDELETE(id)
            .then(() => {
                this.$alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                this.$timeout(() => {
                    this.$scope.$hide();
                    this.$window.location.reload();
                }, 1000);
            });
    }
}

angular.module('kpmApp')
    .controller('PasienHapusController', PasienHapusController);