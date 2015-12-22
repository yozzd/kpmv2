'use strict';

class AsideLeftController {
    //start-non-standard
    rekam = [{
        'label': 'Daftar Pasien',
        'state': 'rekam'
        }, {
        'label': 'Create Pasien',
        'state': 'rekam.create'
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