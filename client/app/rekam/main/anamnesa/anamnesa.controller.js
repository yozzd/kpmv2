'use strict';

class RkAnamnesaController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

        this.data = {};
        this.submitted = false;

        this.blockmessage = 'Loading ...';
        this.getPasien();

        this.opt1 = [
            {
                id: 1,
                name: 'Ya'
            },
            {
                id: 2,
                name: 'Tidak'
            }
        ];
        this.opt2 = [
            {
                id: 1,
                name: '&lt'
            },
            {
                id: 2,
                name: '&ge;'
            },
            {
                id: 3,
                name: '&plusmn;'
            }
        ];
        this.opt3 = [
            {
                id: 1,
                name: 'minggu'
            },
            {
                id: 2,
                name: 'bulan'
            },
            {
                id: 3,
                name: 'tahun'
            }
        ];
        this.opt4 = [
            {
                id: 1,
                name: 'Ringan'
            },
            {
                id: 2,
                name: 'Berat'
            }
        ];
        this.opt5 = [
            {
                id: 1,
                name: 'Jarang'
            },
            {
                id: 2,
                name: 'Sering'
            }
        ];
        this.opt6 = [
            {
                id: 1,
                name: 'Sedikit'
            },
            {
                id: 2,
                name: 'Banyak'
            }
        ];
        this.opt7 = [
            {
                id: 1,
                name: 'Kumat-kumatan'
            },
            {
                id: 2,
                name: 'Selalu Ada'
            }
        ];
        this.opt8 = [
            {
                id: 1,
                name: 'Jernih'
            },
            {
                id: 2,
                name: 'Kuning'
            },
            {
                id: 3,
                name: 'Hijau'
            },
            {
                id: 4,
                name: 'Kemerahan campur darah'
            }
        ];
        this.opt9 = [
            {
                id: 1,
                name: 'Encer'
            },
            {
                id: 2,
                name: 'Kental'
            }
        ];
        this.opt10 = [
            {
                id: 1,
                name: 'I'
            },
            {
                id: 2,
                name: 'II'
            },
            {
                id: 2,
                name: 'III'
            }
        ];

        //batuk
        this.batuk = {};
        this.batuks = this.opt1;
        this.lamabatuk1 = {};
        this.lamabatuk1s = this.opt2;
        this.lamabatuk3 = {};
        this.lamabatuk3s = this.opt3;
        this.intensitasbatuk = {};
        this.intensitasbatuks = this.opt4;
        this.frekuensibatuk = {};
        this.frekuensibatuks = this.opt5;

        //batukdarah
        this.batukdarah = {};
        this.batukdarahs = this.opt1;
        this.lamabatukdarah1 = {};
        this.lamabatukdarah1s = this.opt2;
        this.lamabatukdarah3 = {};
        this.lamabatukdarah3s = this.opt3;
        this.intensitasbatukdarah = {};
        this.intensitasbatukdarahs = this.opt4;
        this.volumebatukdarah = {};
        this.volumebatukdarahs = this.opt6;

        //sesak
        this.sesak = {};
        this.sesaks = this.opt1;
        this.lamasesak1 = {};
        this.lamasesak1s = this.opt2;
        this.lamasesak3 = {};
        this.lamasesak3s = this.opt3;
        this.sifatsesak = {};
        this.sifatsesaks = this.opt7;
        this.intensitassesak = {};
        this.intensitassesaks = this.opt4;
        this.frekuensisesak = {};
        this.frekuensisesaks = this.opt5;
        this.mengisesak = {};
        this.mengisesaks = this.opt1;
        this.bertambah1sesak = {};
        this.bertambah1sesaks = this.opt1;
        this.bertambah2sesak = {};
        this.bertambah2sesaks = this.opt1;

        //dahak
        this.dahak = {};
        this.dahaks = this.opt1;
        this.volumedahak = {};
        this.volumedahaks = this.opt6;
        this.warnadahak = {};
        this.warnadahaks = this.opt8;
        this.konsistensidahak = {};
        this.konsistensidahaks = this.opt9;

        //nyeri
        this.nyeri = {};
        this.nyeris = this.opt1;

        //demam
        this.demam = {};
        this.demams = this.opt1;
        this.lamademam1 = {};
        this.lamademam1s = this.opt2;
        this.lamademam3 = {};
        this.lamademam3s = this.opt3;
        this.pagisiangdemam = {};
        this.pagisiangdemams = this.opt1;
        this.soredemam = {};
        this.soredemams = this.opt1;
        this.malamdemam = {};
        this.malamdemams = this.opt1;

        //keringat
        this.keringat = {};
        this.keringats = this.opt1;

        //nafsu
        this.nafsu = {};
        this.nafsus = this.opt1;

        //lemah
        this.lemah = {};
        this.lemahs = this.opt1;

        //gravida
        this.gravida = {};
        this.gravidas = this.opt1;
        this.trimester = {};
        this.trimesters = this.opt10;

        //tbcparu
        this.tbcparu = {};
        this.tbcparus = this.opt1;

        //asma
        this.asma = {};
        this.asmas = this.opt1;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('anamnesas').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    //batuk
                    this.batuk = {
                        selected: {
                            name: this.data.batuk
                        }
                    };
                    if (this.data.lamabatuk === '') {
                        this.lamabatuk1 = {
                            selected: null
                        };
                        this.data.lamabatuk2 = null;
                        this.lamabatuk3 = {
                            selected: null
                        };
                    } else {
                        this.lamabatuk1 = {
                            selected: {
                                name: this.data.lamabatuk.split(' ')[0]
                            }
                        };
                        this.data.lamabatuk2 = this.data.lamabatuk.split(' ')[1];
                        this.lamabatuk3 = {
                            selected: {
                                name: this.data.lamabatuk.split(' ')[2]
                            }
                        };
                    }
                    if (this.data.intensitasbatuk === '') {
                        this.intensitasbatuk = {
                            selected: null
                        };
                    } else {
                        this.intensitasbatuk = {
                            selected: {
                                name: this.data.intensitasbatuk
                            }
                        };
                    }
                    if (this.data.frekuensibatuk === '') {
                        this.frekuensibatuk = {
                            selected: null
                        };
                    } else {
                        this.frekuensibatuk = {
                            selected: {
                                name: this.data.frekuensibatuk
                            }
                        };
                    }

                    //batukdarah
                    this.batukdarah = {
                        selected: {
                            name: this.data.batukdarah
                        }
                    };
                    if (this.data.lamabatukdarah === '') {
                        this.lamabatukdarah1 = {
                            selected: null
                        };
                        this.data.lamabatukdarah2 = null;
                        this.lamabatukdarah3 = {
                            selected: null
                        };
                    } else {
                        this.lamabatukdarah1 = {
                            selected: {
                                name: this.data.lamabatukdarah.split(' ')[0]
                            }
                        };
                        this.data.lamabatukdarah2 = this.data.lamabatukdarah.split(' ')[1];
                        this.lamabatukdarah3 = {
                            selected: {
                                name: this.data.lamabatukdarah.split(' ')[2]
                            }
                        };
                    }
                    if (this.data.intensitasbatukdarah === '') {
                        this.intensitasbatukdarah = {
                            selected: null
                        };
                    } else {
                        this.intensitasbatukdarah = {
                            selected: {
                                name: this.data.intensitasbatukdarah
                            }
                        };
                    }
                    if (this.data.volumebatukdarah === '') {
                        this.volumebatukdarah = {
                            selected: null
                        };
                    } else {
                        this.volumebatukdarah = {
                            selected: {
                                name: this.data.volumebatukdarah
                            }
                        };
                    }

                    //sesak
                    this.sesak = {
                        selected: {
                            name: this.data.sesak
                        }
                    };
                    if (this.data.lamasesak === '') {
                        this.lamasesak1 = {
                            selected: null
                        };
                        this.data.lamasesak2 = null;
                        this.lamasesak3 = {
                            selected: null
                        };
                    } else {
                        this.lamasesak1 = {
                            selected: {
                                name: this.data.lamasesak.split(' ')[0]
                            }
                        };
                        this.data.lamasesak2 = this.data.lamasesak.split(' ')[1];
                        this.lamasesak3 = {
                            selected: {
                                name: this.data.lamasesak.split(' ')[2]
                            }
                        };
                    }
                    if (this.data.sifatsesak === '') {
                        this.sifatsesak = {
                            selected: null
                        };
                    } else {
                        this.sifatsesak = {
                            selected: {
                                name: this.data.sifatsesak
                            }
                        };
                    }
                    if (this.data.intensitassesak === '') {
                        this.intensitassesak = {
                            selected: null
                        };
                    } else {
                        this.intensitassesak = {
                            selected: {
                                name: this.data.intensitassesak
                            }
                        };
                    }
                    if (this.data.frekuensisesak === '') {
                        this.frekuensisesak = {
                            selected: null
                        };
                    } else {
                        this.frekuensisesak = {
                            selected: {
                                name: this.data.frekuensisesak
                            }
                        };
                    }
                    if (this.data.mengisesak === '') {
                        this.mengisesak = {
                            selected: null
                        };
                    } else {
                        this.mengisesak = {
                            selected: {
                                name: this.data.mengisesak
                            }
                        };
                    }
                    if (this.data.bertambah1sesak === '') {
                        this.bertambah1sesak = {
                            selected: null
                        };
                    } else {
                        this.bertambah1sesak = {
                            selected: {
                                name: this.data.bertambah1sesak
                            }
                        };
                    }
                    if (this.data.bertambah2sesak === '') {
                        this.bertambah2sesak = {
                            selected: null
                        };
                    } else {
                        this.bertambah2sesak = {
                            selected: {
                                name: this.data.bertambah2sesak
                            }
                        };
                    }
                    if (this.data.faktorsesak === '') {
                        this.data.faktorsesak = null;
                    } else {
                        this.data.faktorsesak = this.data.faktorsesak;
                    }

                    //dahak
                    this.dahak = {
                        selected: {
                            name: this.data.dahak
                        }
                    };
                    if (this.data.volumedahak === '') {
                        this.volumedahak = {
                            selected: null
                        };
                    } else {
                        this.volumedahak = {
                            selected: {
                                name: this.data.volumedahak
                            }
                        };
                    }
                    if (this.data.warnadahak === '') {
                        this.warnadahak = {
                            selected: null
                        };
                    } else {
                        this.warnadahak = {
                            selected: {
                                name: this.data.warnadahak
                            }
                        };
                    }
                    if (this.data.konsistensidahak === '') {
                        this.konsistensidahak = {
                            selected: null
                        };
                    } else {
                        this.konsistensidahak = {
                            selected: {
                                name: this.data.konsistensidahak
                            }
                        };
                    }

                    //nyeri
                    this.nyeri = {
                        selected: {
                            name: this.data.nyeri
                        }
                    };
                    if (this.data.lokasinyeri === '') {
                        this.data.lokasinyeri = null;
                    } else {
                        this.data.lokasinyeri = this.data.lokasinyeri;
                    }

                    //demam
                    this.demam = {
                        selected: {
                            name: this.data.demam
                        }
                    };
                    if (this.data.lamademam === '') {
                        this.lamademam1 = {
                            selected: null
                        };
                        this.data.lamademam2 = null;
                        this.lamademam3 = {
                            selected: null
                        };
                    } else {
                        this.lamademam1 = {
                            selected: {
                                name: this.data.lamademam.split(' ')[0]
                            }
                        };
                        this.data.lamademam2 = this.data.lamademam.split(' ')[1];
                        this.lamademam3 = {
                            selected: {
                                name: this.data.lamademam.split(' ')[2]
                            }
                        };
                    }
                    if (this.data.pagisiangdemam === '') {
                        this.pagisiangdemam = {
                            selected: null
                        };
                    } else {
                        this.pagisiangdemam = {
                            selected: {
                                name: this.data.pagisiangdemam
                            }
                        };
                    }
                    if (this.data.soredemam === '') {
                        this.soredemam = {
                            selected: null
                        };
                    } else {
                        this.soredemam = {
                            selected: {
                                name: this.data.soredemam
                            }
                        };
                    }
                    if (this.data.malamdemam === '') {
                        this.malamdemam = {
                            selected: null
                        };
                    } else {
                        this.malamdemam = {
                            selected: {
                                name: this.data.malamdemam
                            }
                        };
                    }

                    //keringat
                    this.keringat = {
                        selected: {
                            name: this.data.keringat
                        }
                    };

                    //nafsu
                    this.nafsu = {
                        selected: {
                            name: this.data.nafsu
                        }
                    };

                    //lemah
                    this.lemah = {
                        selected: {
                            name: this.data.lemah
                        }
                    };

                    //gravida
                    this.gravida = {
                        selected: {
                            name: this.data.gravida
                        }
                    };
                    if (this.data.trimester === '') {
                        this.trimester = {
                            selected: null
                        };
                    } else {
                        this.trimester = {
                            selected: {
                                name: this.data.trimester
                            }
                        };
                    }

                    //tbcparu
                    this.tbcparu = {
                        selected: {
                            name: this.data.tbcparu
                        }
                    };

                    //asma
                    this.asma = {
                        selected: {
                            name: this.data.asma
                        }
                    };

                    this.block.stop();
                }, 1000);
            });
    }

    clbatuk(x) {
        if (x == 2) {
            this.lamabatuk1 = {
                selected: null
            };
            this.data.lamabatuk2 = null;
            this.lamabatuk3 = {
                selected: null
            };
            this.intensitasbatuk = {
                selected: null
            };
            this.frekuensibatuk = {
                selected: null
            };
        }
    }

    clbatukdarah(x) {
        if (x == 2) {
            this.lamabatukdarah1 = {
                selected: null
            };
            this.data.lamabatukdarah2 = null;
            this.lamabatukdarah3 = {
                selected: null
            };
            this.intensitasbatukdarah = {
                selected: null
            };
            this.volumebatukdarah = {
                selected: null
            };
        }
    }

    clsesak(x) {
        if (x == 2) {
            this.lamasesak1 = {
                selected: null
            };
            this.data.lamasesak2 = null;
            this.lamasesak3 = {
                selected: null
            };
            this.sifatsesak = {
                selected: null
            };
            this.intensitassesak = {
                selected: null
            };
            this.frekuensisesak = {
                selected: null
            };
            this.mengisesak = {
                selected: null
            };
            this.bertambah1sesak = {
                selected: null
            };
            this.bertambah2sesak = {
                selected: null
            };
            this.data.faktorsesak = null;
        }
    }

    cldahak(x) {
        if (x == 2) {
            this.volumedahak = {
                selected: null
            };
            this.warnadahak = {
                selected: null
            };
            this.konsistensidahak = {
                selected: null
            };
        }
    }

    clnyeri(x) {
        if (x == 2) {
            this.data.lokasinyeri = null;
        }
    }

    cldemam(x) {
        if (x == 2) {
            this.lamademam1 = {
                selected: null
            };
            this.data.lamademam2 = null;
            this.lamademam3 = {
                selected: null
            };
            this.pagisiangdemam = {
                selected: null
            };
            this.soredemam = {
                selected: null
            };
            this.malamdemam = {
                selected: null
            };
        }
    }

    clgravida(x) {
        if (x == 2) {
            this.trimester = {
                selected: null
            };
        }
    }

    cltbcparu(x) {
        if (x == 2) {
            this.data.tbcparuya = null;
        }
    }

    clasma(x) {
        if (x == 2) {
            this.data.asmaya = null;
        }
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    batuk: this.batuk.selected.name,
                    lamabatuk: this.batuk.selected.name === 'Tidak' ? '' : this.lamabatuk1.selected.name + ' ' + this.data.lamabatuk2 + ' ' + this.lamabatuk3.selected.name,
                    intensitasbatuk: this.batuk.selected.name === 'Tidak' ? '' : this.intensitasbatuk.selected.name,
                    frekuensibatuk: this.batuk.selected.name === 'Tidak' ? '' : this.frekuensibatuk.selected.name,
                    batukdarah: this.batukdarah.selected.name,
                    lamabatukdarah: this.batukdarah.selected.name === 'Tidak' ? '' : this.lamabatukdarah1.selected.name + ' ' + this.data.lamabatukdarah2 + ' ' + this.lamabatukdarah3.selected.name,
                    intensitasbatukdarah: this.batukdarah.selected.name === 'Tidak' ? '' : this.intensitasbatukdarah.selected.name,
                    volumebatukdarah: this.batukdarah.selected.name === 'Tidak' ? '' : this.volumebatukdarah.selected.name,
                    sesak: this.sesak.selected.name,
                    lamasesak: this.sesak.selected.name === 'Tidak' ? '' : this.lamasesak1.selected.name + ' ' + this.data.lamasesak2 + ' ' + this.lamasesak3.selected.name,
                    sifatsesak: this.sesak.selected.name === 'Tidak' ? '' : this.sifatsesak.selected.name,
                    intensitassesak: this.sesak.selected.name === 'Tidak' ? '' : this.intensitassesak.selected.name,
                    frekuensisesak: this.sesak.selected.name === 'Tidak' ? '' : this.frekuensisesak.selected.name,
                    mengisesak: this.sesak.selected.name === 'Tidak' ? '' : this.mengisesak.selected.name,
                    bertambah1sesak: this.sesak.selected.name === 'Tidak' ? '' : this.bertambah1sesak.selected.name,
                    bertambah2sesak: this.sesak.selected.name === 'Tidak' ? '' : this.bertambah2sesak.selected.name,
                    faktorsesak: this.sesak.selected.name === 'Tidak' ? '' : this.data.faktorsesak,
                    dahak: this.dahak.selected.name,
                    volumedahak: this.dahak.selected.name === 'Tidak' ? '' : this.volumedahak.selected.name,
                    warnadahak: this.dahak.selected.name === 'Tidak' ? '' : this.warnadahak.selected.name,
                    konsistensidahak: this.dahak.selected.name === 'Tidak' ? '' : this.konsistensidahak.selected.name,
                    nyeri: this.nyeri.selected.name,
                    lokasinyeri: this.nyeri.selected.name === 'Tidak' ? '' : this.data.lokasinyeri
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

    submit2(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    demam: this.demam.selected.name,
                    lamademam: this.demam.selected.name === 'Tidak' ? '' : this.lamademam1.selected.name + ' ' + this.data.lamademam2 + ' ' + this.lamademam3.selected.name,
                    pagisiangdemam: this.demam.selected.name === 'Tidak' ? '' : this.pagisiangdemam.selected.name,
                    soredemam: this.demam.selected.name === 'Tidak' ? '' : this.soredemam.selected.name,
                    malamdemam: this.demam.selected.name === 'Tidak' ? '' : this.malamdemam.selected.name,
                    keringat: this.keringat.selected.name,
                    nafsu: this.nafsu.selected.name,
                    lemah: this.lemah.selected.name,
                    lain: this.data.lain
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

    submit3(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    penyakit: this.data.penyakit
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

    submit4(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    pengobatan: this.data.pengobatan
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

    submit5(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    gravida: this.gravida.selected.name,
                    trimester: this.gravida.selected.name === 'Tidak' ? '' : this.trimester.selected.name
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

    submit6(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    lamamerokok: this.data.lamamerokok,
                    jenisrokok: this.data.jenisrokok,
                    banyakrokok: this.data.banyakrokok,
                    usiamerokok: this.data.usiamerokok,
                    lamaobat: this.data.lamaobat,
                    jenisobat: this.data.jenisobat,
                    lamaalkohol: this.data.lamaalkohol,
                    jenisalkohol: this.data.jenisalkohol
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

    submit7(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('anamnesas').customPUT({
                    tbcparu: this.tbcparu.selected.name,
                    tbcparuya: this.tbcparu.selected.name === 'Tidak' ? '' : this.data.tbcparuya,
                    asma: this.asma.selected.name,
                    asmaya: this.asma.selected.name === 'Tidak' ? '' : this.data.asmaya
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
    .controller('RkAnamnesaController', RkAnamnesaController);