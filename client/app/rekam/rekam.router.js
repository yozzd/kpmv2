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
            })
            .state('rekam.sub', {
                url: '/sub/{id}',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/sub/sub.html',
                        controller: 'RSubController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{rk.nama}}'
                }
            })
            .state('rekam.sub.profil', {
                url: '/profil',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/profil/profil.html',
                        controller: 'RProfilController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Profil'
                }
            });
    });