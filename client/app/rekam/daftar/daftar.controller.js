'use strict';

class RkDaftarController {

    constructor(Restangular, blockUI, $timeout, $modal, $scope) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;
        this.$modal = $modal;
        this.$scope = $scope;

        this.getPasien();
        this.predicate = 'registrasi';

        this.by = {};
        this.bys = [
            {
                id: '1',
                name: 'No. Registrasi'
            },
            {
                id: '2',
                name: 'Nama Pasien'
            }
        ];
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
}

angular.module('kpmApp.rekam')
    .controller('RkDaftarController', RkDaftarController);