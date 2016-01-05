'use strict';

class RkDiagnosaController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

        this.pdiagnosa = {};
        this.submitted = false;

        this.blockmessage = 'Loading ...';
        this.getPasien();

        this.opt1 = [
            {
                id: 1,
                name: 'TB Paru BTA Positif'
            },
            {
                id: 2,
                name: 'TB Paru BTA Negatif'
            },
            {
                id: 3,
                name: 'TB Paru Anak (Tersangka)'
            },
            {
                id: 4,
                name: 'TB Ekstra Paru'
            }
        ];

        this.opt2 = [
            {
                id: 1,
                name: 'Baru'
            },
            {
                id: 2,
                name: 'Kambuh'
            },
            {
                id: 3,
                name: 'After Default'
            },
            {
                id: 4,
                name: 'Gagal'
            },
            {
                id: 5,
                name: 'Kronis'
            }
        ];

        this.opt3 = [
            {
                id: 1,
                name: 'Ringan'
            },
            {
                id: 2,
                name: 'Berat'
            }
        ];

        this.opt4 = [
            {
                id: 1,
                name: 'Pleuritis TB (Pl. Eksudativa)'
            },
            {
                id: 2,
                name: 'Menigitis TB'
            },
            {
                id: 3,
                name: 'Kelenjar Regio Colli'
            },
            {
                id: 4,
                name: 'Sub Mandibular'
            },
            {
                id: 5,
                name: 'Axilla Dextra'
            },
            {
                id: 6,
                name: 'Sinistra'
            }
        ];

        this.opt5 = [
            {
                id: 1,
                name: 'Pneumonia'
            },
            {
                id: 2,
                name: 'Bronkhitis'
            },
            {
                id: 3,
                name: 'Influenza / Flu'
            },
            {
                id: 4,
                name: 'Rhinitis'
            },
            {
                id: 5,
                name: 'Tonsilitis'
            },
            {
                id: 6,
                name: 'Faryngitis / Tonsillofaringitis'
            },
            {
                id: 7,
                name: 'Laringitis'
            },
            {
                id: 8,
                name: 'Sinusitis'
            }
        ];

        this.opt6 = [
            {
                id: 1,
                name: '< 5 Tahun'
            },
            {
                id: 2,
                name: '> 5 Tahun'
            }
        ];

        this.opt7 = [
            {
                id: 1,
                name: 'Pneumothoraks'
            },
            {
                id: 2,
                name: 'Efusi Pleura (Hemathothoraks / Empyema)'
            },
            {
                id: 3,
                name: 'Hydropneumothoraks'
            },
            {
                id: 4,
                name: 'Tumor Pleura'
            },
            {
                id: 5,
                name: 'Schwarte'
            }
        ];

        this.opt8 = [
            {
                id: 1,
                name: 'Primer'
            },
            {
                id: 2,
                name: 'Sekunder'
            }
        ];

        this.opt9 = [
            {
                id: 1,
                name: 'Partialis'
            },
            {
                id: 2,
                name: 'Totalis'
            },
            {
                id: 3,
                name: 'Ventil'
            }
        ];

        this.opt10 = [
            {
                id: 1,
                name: 'Ringan'
            },
            {
                id: 2,
                name: 'Sedang'
            },
            {
                id: 3,
                name: 'Berat / Masif'
            }
        ];

        this.opt11 = [
            {
                id: 1,
                name: 'Dewasa'
            },
            {
                id: 2,
                name: 'Anak'
            }
        ];

        this.opt12 = [
            {
                id: 1,
                name: 'Intermitten'
            },
            {
                id: 2,
                name: 'Persisten Ringan'
            },
            {
                id: 3,
                name: 'Persisten Sedang'
            },
            {
                id: 4,
                name: 'Persisten Berat'
            },
            {
                id: 5,
                name: 'Eksaserbasi Berat'
            },
            {
                id: 6,
                name: 'Status Asmaticus'
            }
        ];

        this.opt13 = [
            {
                id: 1,
                name: 'Episodik Jarang'
            },
            {
                id: 2,
                name: 'Episodik Sering'
            },
            {
                id: 3,
                name: 'Asma Persisten'
            }
        ];

        this.opt14 = [
            {
                id: 1,
                name: 'Stabil'
            },
            {
                id: 2,
                name: 'Eksaserbasi Akut'
            }
        ];

        this.opt15 = [
            {
                id: 1,
                name: 'Ringan'
            },
            {
                id: 2,
                name: 'Sedang'
            },
            {
                id: 3,
                name: 'Berat'
            }
        ];

        this.opt16 = [
            {
                id: 1,
                name: 'Emboli Paru'
            },
            {
                id: 2,
                name: 'Infark Paru'
            }
        ];

        this.opt17 = [
            {
                id: 1,
                name: 'SOPT'
            },
            {
                id: 2,
                name: 'Kalsifikasi'
            },
            {
                id: 3,
                name: 'Fibrosis'
            }
        ];

        //tbparu
        this.ptbparu = {};
        this.ptbparus = this.opt1;

        this.ptbparupositif = {};
        this.ptbparupositifs = this.opt2;

        this.ptbparunegatif = {};
        this.ptbparunegatifs = this.opt3;

        this.ptbparuekstra = {};
        this.ptbparuekstras = this.opt3;

        this.ptbparuekstralokasi = {};
        this.ptbparuekstralokasis = this.opt4;

        //ispa
        this.pispa = {};
        this.pispas = this.opt5;

        this.ppneumonia = {};
        this.ppneumonias = this.opt6;

        //pleura
        this.ppleura = {};
        this.ppleuras = this.opt7;

        this.ppneumothoraks1 = {};
        this.ppneumothoraks1s = this.opt8;

        this.ppneumothoraks2 = {};
        this.ppneumothoraks2s = this.opt9;

        this.pefusi = {};
        this.pefusis = this.opt10;

        //bronkhial
        this.pbronkhial = {};
        this.pbronkhials = this.opt11;

        this.pdewasa = {};
        this.pdewasas = this.opt12;

        this.panak = {};
        this.panaks = this.opt13;

        //ppok
        this.pppok = {};
        this.pppoks = this.opt14;

        this.peksaserbasi = {};
        this.peksaserbasis = this.opt15;

        //pvascular
        this.pvascular = {};
        this.pvasculars = this.opt16;

        //psequele
        this.psequele = {};
        this.psequeles = this.opt17;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('diagnosas').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    this.pdiagnosa = {
                        opt: this.data.pdiagnosa
                    };

                    if (this.data.pdiagnosa === '1') {
                        this.ptbparu = {
                            selected: {
                                name: this.data.ptbparu
                            }
                        };
                        if (this.data.ptbparu === 'TB Paru BTA Positif') {
                            this.ptbparupositif = {
                                selected: {
                                    name: this.data.ptbparupositif
                                }
                            };
                        } else {
                            this.ptbparupositif = {
                                selected: undefined
                            };
                        }
                        if (this.data.ptbparu === 'TB Paru BTA Negatif') {
                            this.ptbparunegatif = {
                                selected: {
                                    name: this.data.ptbparunegatif
                                }
                            };
                        } else {
                            this.ptbparunegatif = {
                                selected: undefined
                            };
                        }
                        if (this.data.ptbparu === 'TB Ekstra Paru') {
                            this.ptbparuekstra = {
                                selected: {
                                    name: this.data.ptbparuekstra
                                }
                            };
                            this.ptbparuekstralokasi = {
                                selected: {
                                    name: this.data.ptbparuekstralokasi
                                }
                            };
                        } else {
                            this.ptbparuekstra = {
                                selected: undefined
                            };
                            this.ptbparuekstralokasi = {
                                selected: undefined
                            };
                        }
                    } else {
                        this.ptbparu = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '2') {
                        this.pispa = {
                            selected: {
                                name: this.data.pispa
                            }
                        };
                        if (this.data.pispa === 'Pneumonia') {
                            this.ppneumonia = {
                                selected: {
                                    name: this.data.ppneumonia
                                }
                            };
                        } else {
                            this.ppneumonia = {
                                selected: undefined
                            };
                        }
                    } else {
                        this.pispa = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '3') {
                        this.ppleura = {
                            selected: {
                                name: this.data.ppleura
                            }
                        };
                        if (this.data.ppleura === 'Pneumothoraks') {
                            this.ppneumothoraks1 = {
                                selected: {
                                    name: this.data.ppneumothoraks1
                                }
                            };
                            this.ppneumothoraks2 = {
                                selected: {
                                    name: this.data.ppneumothoraks2
                                }
                            };
                        } else {
                            this.ppneumothoraks1 = {
                                selected: undefined
                            };
                            this.ppneumothoraks2 = {
                                selected: undefined
                            };
                        }
                        if (this.data.ppleura === 'Efusi Pleura (Hemathothoraks / Empyema)') {
                            this.pefusi = {
                                selected: {
                                    name: this.data.pefusi
                                }
                            };
                        } else {
                            this.pefusi = {
                                selected: undefined
                            };
                        }
                    } else {
                        this.ppleura = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '4') {
                        this.pbronkhial = {
                            selected: {
                                name: this.data.pbronkhial
                            }
                        };
                        if (this.data.pbronkhial === 'Dewasa') {
                            this.pdewasa = {
                                selected: {
                                    name: this.data.pdewasa
                                }
                            };
                        } else {
                            this.pdewasa = {
                                selected: undefined
                            };
                        }
                        if (this.data.pbronkhial === 'Anak') {
                            this.panak = {
                                selected: {
                                    name: this.data.panak
                                }
                            };
                        } else {
                            this.panak = {
                                selected: undefined
                            };
                        }
                    } else {
                        this.pbronkhial = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '5') {
                        this.pppok = {
                            selected: {
                                name: this.data.pppok
                            }
                        };
                        if (this.data.pppok === 'Eksaserbasi Akut') {
                            this.peksaserbasi = {
                                selected: {
                                    name: this.data.peksaserbasi
                                }
                            };
                        } else {
                            this.peksaserbasi = {
                                selected: undefined
                            };
                        }
                    } else {
                        this.pppok = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '10') {
                        this.ptptipe = this.data.ptptipe;
                        this.ptpstadium = this.data.ptpstadium;
                    } else {
                        this.ptptipe = '';
                        this.ptpstadium = '';
                    }

                    if (this.data.pdiagnosa === '12') {
                        this.pvascular = {
                            selected: {
                                name: this.data.pvascular
                            }
                        };
                    } else {
                        this.pvascular = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '13') {
                        this.psequele = {
                            selected: {
                                name: this.data.psequele
                            }
                        };
                    } else {
                        this.psequele = {
                            selected: undefined
                        };
                    }

                    if (this.data.pdiagnosa === '14') {
                        this.pparu = this.data.pparu;
                    } else {
                        this.pparu = '';
                    }

                    if (this.data.pdiagnosa === '15') {
                        this.pnonparu = this.data.pnonparu;
                    } else {
                        this.pnonparu = '';
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('diagnosas').customPUT({
                    pdiagnosa: this.pdiagnosa.opt,
                    ptbparu: this.ptbparu.selected === undefined ? '' : this.ptbparu.selected.name,
                    ptbparupositif: this.ptbparupositif.selected === undefined ? '' : this.ptbparupositif.selected.name,
                    ptbparunegatif: this.ptbparunegatif.selected === undefined ? '' : this.ptbparunegatif.selected.name,
                    ptbparuekstra: this.ptbparuekstra.selected === undefined ? '' : this.ptbparuekstra.selected.name,
                    ptbparuekstralokasi: this.ptbparuekstralokasi.selected === undefined ? '' : this.ptbparuekstralokasi.selected.name,
                    pispa: this.pispa.selected === undefined ? '' : this.pispa.selected.name,
                    ppneumonia: this.ppneumonia.selected === undefined ? '' : this.ppneumonia.selected.name,
                    ppleura: this.ppleura.selected === undefined ? '' : this.ppleura.selected.name,
                    ppneumothoraks1: this.ppneumothoraks1.selected === undefined ? '' : this.ppneumothoraks1.selected.name,
                    ppneumothoraks2: this.ppneumothoraks2.selected === undefined ? '' : this.ppneumothoraks2.selected.name,
                    pefusi: this.pefusi.selected === undefined ? '' : this.pefusi.selected.name,
                    pbronkhial: this.pbronkhial.selected === undefined ? '' : this.pbronkhial.selected.name,
                    pdewasa: this.pdewasa.selected === undefined ? '' : this.pdewasa.selected.name,
                    panak: this.panak.selected === undefined ? '' : this.panak.selected.name,
                    pppok: this.pppok.selected === undefined ? '' : this.pppok.selected.name,
                    peksaserbasi: this.peksaserbasi.selected === undefined ? '' : this.peksaserbasi.selected.name,
                    ptptipe: this.ptptipe,
                    ptpstadium: this.ptpstadium,
                    pvascular: this.pvascular.selected === undefined ? '' : this.pvascular.selected.name,
                    psequele: this.psequele.selected === undefined ? '' : this.psequele.selected.name,
                    pparu: this.pparu,
                    pnonparu: this.pnonparu,
                }, this.data._id)
                .then(() => {
                    this.blockmessage = 'Updating ...';
                    this.getPasien();
                })
                .catch(err => {
                    this.$alert({
                        content: err.data,
                        placement: 'top-right',
                        type: 'danger',
                        duration: 5
                    });
                });
        }
    }
}

angular.module('kpmApp.rekam')
    .controller('RkDiagnosaController', RkDiagnosaController);