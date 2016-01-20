'use strict';

angular.module('kpmApp.rekam')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rekam', {
                url: '/r',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/daftar/daftar.html',
                        controller: 'RkDaftarController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar Pasien'
                }
            })
            .state('rekam.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/create/create.html',
                        controller: 'RkCreateController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Pasien'
                }
            })
            .state('rekam.sub', {
                url: '/sub/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/sub/sub.html',
                        controller: 'RkSubController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{rk.nama}}'
                }
            })
            .state('rekam.sub.profil', {
                url: '/profil',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/profil/profil.html',
                        controller: 'RkProfilController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Profil'
                }
            })
            .state('rekam.sub.anamnesa', {
                url: '/anamnesa',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/anamnesa/anamnesa.html',
                        controller: 'RkAnamnesaController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Anamnesa'
                }
            })
            .state('rekam.sub.fisik', {
                url: '/fisik',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/fisik/fisik.html',
                        controller: 'RkFisikDiagnostikController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Fisik Diagnostik'
                }
            })
            .state('rekam.sub.radiologi', {
                url: '/radiologi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/radiologi/radiologi.html',
                        controller: 'RkRadiologiController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Radiologi'
                }
            })
            .state('rekam.sub.laboratorium', {
                url: '/laboratorium',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/laboratorium/laboratorium.html',
                        controller: 'RkLaboratoriumController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Laboratorium'
                }
            })
            .state('rekam.sub.medis', {
                url: '/medis',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/medis/medis.html',
                        controller: 'RkMedisController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan / Tindakan Medis Diagnostik'
                }
            })
            .state('rekam.sub.diagnosa', {
                url: '/diagnosa',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/diagnosa/diagnosa.html',
                        controller: 'RkDiagnosaController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Diagnosa'
                }
            })
            .state('rekam.sub.pengobatan', {
                url: '/pengobatan',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/pengobatan/pengobatan.html',
                        controller: 'RkPengobatanController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pengobatan'
                }
            })
            .state('rekam.sub.terapi', {
                url: '/terapi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/terapi/terapi.html',
                        controller: 'RkTerapiController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Tindakan Medik Terapi'
                }
            })
            .state('rekam.sub.rehabilitasi', {
                url: '/rehabilitasi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/rehabilitasi/rehabilitasi.html',
                        controller: 'RkRehabilitasiController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Rehabilitasi Medik'
                }
            })
            .state('rekam.sub.konsultasi', {
                url: '/konsultasi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/konsultasi/konsultasi.html',
                        controller: 'RkKonsultasiController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Konsultasi Khusus'
                }
            })
            .state('rekam.sub.usul', {
                url: '/usul',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/usul/usul.html',
                        controller: 'RkUsulController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Usul / Tindakan Lanjut'
                }
            })
            .state('rekam.sub.kontrol', {
                url: '/kontrol',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kontrol/daftar/daftar.html',
                        controller: 'RkKontrolDaftarController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Kartu Kontrol'
                }
            })
            .state('rekam.sub.kontrol.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kontrol/create/create.html',
                        controller: 'RkKontrolCreateController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create Kartu Kontrol'
                }
            })
            .state('rekam.sub.kontrol.edit', {
                url: '/edit/{kid}',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kontrol/edit/edit.html',
                        controller: 'RkKontrolEditController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Kartu Kontrol'
                }
            })
            .state('rekam.rekapitulasi', {
                url: '/rekapitulasi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/rekapitulasi/daftar/daftar.html',
                        controller: 'RkRekapitulasiDaftarController',
                        controllerAs: 'rk'
                    }
                },
                data: {
                    permissions: {
                        only: ['rekam', 'admin'],
                        redirectTo: 'forbidden'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Rekapitulasi'
                }
            });
    });