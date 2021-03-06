'use strict';

class gdDaftarController {

    constructor(Restangular, blockUI, $timeout) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;

        this.getObat();
    }

    getObat() {
        this.block.start();
        this.Restangular.all('obats').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;
                    this.nodata = this.datas.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }
}

angular.module('kpmApp.gudang')
    .controller('gdDaftarController', gdDaftarController);