'use strict';

class MainController {

    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isRekam = Auth.isRekam;
        this.getCurrentUser = Auth.getCurrentUser;

        this.rekam = [{
            'label': 'Daftar Pasien',
            'state': 'rekam',
            'icon': 'fa fa-th-list fa-4x'
        }, {
            'label': 'Create Pasien',
            'state': 'rekam.create',
            'icon': 'fa fa-user-plus fa-4x'
        }, {
            'label': 'Rekapitulasi',
            'state': 'rekam.rekapitulasi',
            'icon': 'fa fa-users fa-4x'
        }, {
            'label': 'Settings',
            'state': 'settings',
            'icon': 'fa fa-cog fa-4x'
        }];
    }
}

angular.module('kpmApp')
    .controller('MainController', MainController);