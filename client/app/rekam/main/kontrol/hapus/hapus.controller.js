'use strict';

class KartuHapusController {

    constructor(Restangular, $alert, $scope, $state) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$state = $state;
    }

    hapus(id, kid) {
        this.Restangular.one('kontrols/hapus').customPUT({
                kid: kid
            }, id)
            .then(() => {
                this.$scope.$hide();
                this.$state.go('rekam.sub.kontrol');
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
    .controller('KartuHapusController', KartuHapusController);