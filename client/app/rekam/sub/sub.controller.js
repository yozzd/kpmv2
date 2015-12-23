'use strict';

class RSubController {

    constructor(Restangular, $stateParams) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.getPasien();
    }

    getPasien() {
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.id = data._id;
                this.nama = data.nama;
            });
    }
}

angular.module('kpmApp.rekam')
    .controller('RSubController', RSubController);