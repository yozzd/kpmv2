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
            })
            .state('rekam.sub.fisik', {
                url: '/fisik',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/fisik/fisik.html',
                        controller: 'RkFisikDiagnostikController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Fisik Diagnostik'
                }
            })
            .state('rekam.sub.radiologi', {
                url: '/radiologi',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/radiologi/radiologi.html',
                        controller: 'RkRadiologiController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Radiologi'
                }
            })
            .state('rekam.sub.laboratorium', {
                url: '/laboratorium',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/laboratorium/laboratorium.html',
                        controller: 'RkLaboratoriumController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Laboratorium'
                }
            })
            .state('rekam.sub.medis', {
                url: '/medis',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/medis/medis.html',
                        controller: 'RkMedisController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pemeriksaan / Tindakan Medis Diagnostik'
                }
            })
            .state('rekam.sub.diagnosa', {
                url: '/diagnosa',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/diagnosa/diagnosa.html',
                        controller: 'RkDiagnosaController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Diagnosa'
                }
            })
            .state('rekam.sub.pengobatan', {
                url: '/pengobatan',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/pengobatan/pengobatan.html',
                        controller: 'RkPengobatanController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Pengobatan'
                }
            })
            .state('rekam.sub.terapi', {
                url: '/terapi',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/terapi/terapi.html',
                        controller: 'RkTerapiController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Tindakan Medik Terapi'
                }
            })
            .state('rekam.sub.rehabilitasi', {
                url: '/rehabilitasi',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/rehabilitasi/rehabilitasi.html',
                        controller: 'RkRehabilitasiController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Rehabilitasi Medik'
                }
            })
            .state('rekam.sub.konsultasi', {
                url: '/konsultasi',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/konsultasi/konsultasi.html',
                        controller: 'RkKonsultasiController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Konsultasi Khusus'
                }
            })
            .state('rekam.sub.usul', {
                url: '/usul',
                authenticate: 'rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/usul/usul.html',
                        controller: 'RkUsulController',
                        controllerAs: 'rk'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Usul / Tindakan Lanjut'
                }
            });
    });