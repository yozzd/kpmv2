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
        'icon': 'fa fa-book fa-fw'
    }, {
        'label': 'Settings',
        'state': 'settings',
        'icon': 'fa fa-cog fa-fw'
    }];

    gudang = [{
        'label': 'Daftar Obat',
        'state': 'gudang',
        'icon': 'fa fa-th-list fa-fw'
    }, {
        'label': 'Satuan',
        'state': 'gudang.satuan',
        'icon': 'fa fa-hashtag fa-fw'
    }, {
        'label': 'Daftar Obat Masuk',
        'state': 'gudang.masuk',
        'icon': 'fa fa-sign-in fa-fw'
    }, {
        'label': 'Daftar Obat Keluar',
        'state': 'gudang.keluar',
        'icon': 'fa fa-sign-out fa-fw'
    }, {
        'label': 'Settings',
        'state': 'settings',
        'icon': 'fa fa-cog fa-fw'
    }];

    //end-non-standard

    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isGudang = Auth.isGudang;
        this.isRekam = Auth.isRekam;
        this.getCurrentUser = Auth.getCurrentUser;
    }
}

angular.module('kpmApp')
    .controller('AsideLeftController', AsideLeftController);