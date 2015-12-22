'use strict';

angular.module('kpmApp.rekam')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rekam', {
                url: '/r',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/daftar/daftar.html',
                        controller: 'RDaftarController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Pasien'
                }
            })
            .state('rekam.create', {
                url: '/create',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/create/create.html',
                        controller: 'RCreateController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Pasien'
                }
            });
    });