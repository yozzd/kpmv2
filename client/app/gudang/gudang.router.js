'use strict';

angular.module('kpmApp.gudang')
    .config(function ($stateProvider) {
        $stateProvider
            .state('gudang', {
                url: '/g',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/daftar/daftar.html',
                        controller: 'gdDaftarController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Obat'
                }
            })
            .state('gudang.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/create/create.html',
                        controller: 'gdCreateController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Obat'
                }
            })
            .state('gudang.satuan', {
                url: '/satuan',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/satuan/satuan.html',
                        controller: 'gdSatuanController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Satuan'
                }
            })
            .state('gudang.satuan.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/satuan/edit.html',
                        controller: 'gdSatuanEditController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            })
            .state('gudang.masuk', {
                url: '/masuk',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/masuk/daftar/daftar.html',
                        controller: 'gdDaftarMasukController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Obat Masuk'
                }
            })
            .state('gudang.masuk.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/masuk/create/create.html',
                        controller: 'gdCreateMasukController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Obat Masuk'
                }
            })
            .state('gudang.masuk.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/masuk/edit/edit.html',
                        controller: 'gdEditMasukController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Obat Masuk'
                }
            })
            .state('gudang.keluar', {
                url: '/keluar',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/keluar/daftar/daftar.html',
                        controller: 'gdDaftarKeluarController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Obat Keluar'
                }
            })
            .state('gudang.keluar.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/keluar/create/create.html',
                        controller: 'gdCreateKeluarController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Obat Keluar'
                }
            })
            .state('gudang.keluar.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/gudang/keluar/edit/edit.html',
                        controller: 'gdEditKeluarController',
                        controllerAs: 'gd'
                    }
                },
                data: {
                    permissions: {
                        only: ['gudang', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Obat Keluar'
                }
            });
    });