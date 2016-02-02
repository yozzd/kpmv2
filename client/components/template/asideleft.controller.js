'use strict';

class AsideLeftController {
    //start-non-standard
    rekam = [{
        'label': 'Daftar Pasien',
        'state': 'rekam',
        'icon': 'fa fa-th-list fa-fw'
        }, {
        'label': 'Create Pasien',
        'state': 'rekam.create',
        'icon': 'fa fa-user-plus fa-fw'
    }, {
        'label': 'Rekapitulasi',
        'state': 'rekam.rekapitulasi',
        'icon': 'fa fa-users fa-fw'
    }, {
        'label': 'Settings',
        'state': 'settings',
        'icon': 'fa fa-cog fa-fw'
    }];

    //end-non-standard

    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isRekam = Auth.isRekam;
        this.getCurrentUser = Auth.getCurrentUser;
    }
}

angular.module('kpmApp')
    .controller('AsideLeftController', AsideLeftController);