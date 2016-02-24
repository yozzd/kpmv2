'use strict';

class ApResepDaftarController {

    constructor(Restangular, blockUI, $timeout, $stateParams) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;

        this.getPasien();
    }

    getPasien() {
        this.block.start();
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nodata = this.data.resep.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }
}

angular.module('kpmApp.apotek')
    .controller('ApResepDaftarController', ApResepDaftarController);