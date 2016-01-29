'use strict';

class RkSubController {

    constructor(Restangular, $stateParams, $modal, $scope) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$modal = $modal;
        this.$scope = $scope;

        this.getPasien();
    }

    getPasien() {
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.id = data._id;
                this.nama = data.nama;
            });
    }

    showmodal(id) {
        this.scope = this.$scope.$new();
        this.scope.id = id;
        this.modal = this.$modal({
            templateUrl: 'app/rekam/hapus/hapus.html',
            show: false,
            scope: this.scope
        });

        this.modal.$promise.then(this.modal.show);
    }

    popup(id) {
        var left = screen.width / 2 - 400;
        var top = screen.height / 2 - 250;
        var url = '/api/pasiens/cetak/' + id;
        window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
    }
}

angular.module('kpmApp.rekam')
    .controller('RkSubController', RkSubController);