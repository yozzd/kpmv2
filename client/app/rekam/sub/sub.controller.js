'use strict';

class RkSubController {

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

    popup(id) {
        var left = screen.width / 2 - 400;
        var top = screen.height / 2 - 250;
        var url = '/api/pasiens/cetak/' + id;
        window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
    }
}

angular.module('kpmApp.rekam')
    .controller('RkSubController', RkSubController);