'use strict';

class MainController {

    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isGudang = Auth.isGudang;
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
            'icon': 'fa fa-book fa-4x'
        }, {
            'label': 'Settings',
            'state': 'settings',
            'icon': 'fa fa-cog fa-4x'
        }];

        this.gudang = [{
            'label': 'Daftar Obat',
            'state': 'gudang',
            'icon': 'fa fa-th-list fa-4x'
        }, {
            'label': 'Satuan',
            'state': 'gudang.satuan',
            'icon': 'fa fa-hashtag fa-4x'
        }, {
            'label': 'Daftar Obat Masuk',
            'state': 'gudang.masuk',
            'icon': 'fa fa-sign-in fa-4x'
        }, {
            'label': 'Daftar Obat Keluar',
            'state': 'gudang.keluar',
            'icon': 'fa fa-sign-out fa-4x'
        }, {
            'label': 'Settings',
            'state': 'settings',
            'icon': 'fa fa-cog fa-4x'
        }];
    }
}

angular.module('kpmApp')
    .controller('MainController', MainController);