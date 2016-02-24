'use strict';

angular.module('kpmApp.apotek')
    .config(function ($stateProvider) {
        $stateProvider
            .state('apotek', {
                url: '/a',
                views: {
                    '@': {
                        templateUrl: 'app/apotek/daftar/daftar.html',
                        controller: 'ApDaftarController',
                        controllerAs: 'ap'
                    }
                },
                data: {
                    permissions: {
                        only: ['apotek', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Pasien'
                }
            })
            .state('apotek.resep', {
                url: '/resep/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/apotek/resep/daftar/daftar.html',
                        controller: 'ApResepDaftarController',
                        controllerAs: 'ap'
                    }
                },
                data: {
                    permissions: {
                        only: ['apotek', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Resep'
                }
            })
            .state('apotek.resep.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/apotek/resep/create/create.html',
                        controller: 'ApResepCreateController',
                        controllerAs: 'ap'
                    }
                },
                data: {
                    permissions: {
                        only: ['apotek', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Resep'
                }
            })
            .state('apotek.resep.edit', {
                url: '/edit/{tid}',
                views: {
                    '@': {
                        templateUrl: 'app/apotek/resep/edit/edit.html',
                        controller: 'ApResepEditController',
                        controllerAs: 'ap'
                    }
                },
                data: {
                    permissions: {
                        only: ['apotek', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Resep'
                }
            })
            .state('apotek.obat', {
                url: '/obat',
                views: {
                    '@': {
                        templateUrl: 'app/apotek/obat/daftar/daftar.html',
                        controller: 'ApDaftarObatController',
                        controllerAs: 'ap'
                    }
                },
                data: {
                    permissions: {
                        only: ['apotek', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Obat'
                }
            });
    });