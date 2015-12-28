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
                        controller: 'RkDaftarController',
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
                        controller: 'RkCreateController',
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
                        controller: 'RkSubController',
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
                        controller: 'RkProfilController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Profil'
                }
            })
            .state('rekam.sub.anamnesa', {
                url: '/anamnesa',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/anamnesa/anamnesa.html',
                        controller: 'RkAnamnesaController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Anamnesa'
                }
            });
    });