'use strict';

class ApDaftarController {

    constructor(Restangular, blockUI, $timeout) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;

        this.getPasien();
        this.predicate = 'registrasi';
    }

    getPasien() {
        this.block.start();
        this.Restangular.all('pasiens').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;
                    this.nodata = this.datas.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }
}

angular.module('kpmApp.apotek')
    .controller('ApDaftarController', ApDaftarController);