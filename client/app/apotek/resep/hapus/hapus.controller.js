'use strict';

class ResepHapusController {

    constructor(Restangular, $alert, $scope, $state, $stateParams) {
        this.Restangular = Restangular;
        this.$alert = $alert;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
    }

    hapus(id) {
        this.Restangular.one('pasiens/rdel').customPUT({
                id: id
            }, this.$stateParams.id)
            .then(() => {
                this.$scope.$hide();
                this.$alert({
                    content: 'Data berhasil dihapus',
                    placement: 'top-right',
                    type: 'info',
                    duration: 5
                });
                this.$state.go('apotek.resep');
            });
    }
}

angular.module('kpmApp.apotek')
    .controller('ResepHapusController', ResepHapusController);