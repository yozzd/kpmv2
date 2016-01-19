'use strict';

class RkProfilController {

    constructor(Restangular, $stateParams, $alert) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;

        this.data = {};
        this.submitted = false;

        this.getPasien();

        this.jk = {};
        this.jks = [
            {
                id: '1',
                name: 'L'
            },
            {
                id: '2',
                name: 'P'
            }
        ];

        this.sk = {};
        this.sks = [
            {
                id: '1',
                name: 'A'
            },
            {
                id: '2',
                name: 'I'
            },
            {
                id: '3',
                name: 'S'
            },
            {
                id: '4',
                name: 'J'
            },
            {
                id: '5',
                name: 'D'
            }
        ];

        this.dikirim = {};
        this.dikirims = [
            {
                id: '1',
                name: 'Puskesmas'
            },
            {
                id: '2',
                name: 'Rumah Sakit / Klinik'
            },
            {
                id: '3',
                name: 'Praktek Dokter Swasta (PDS)'
            },
            {
                id: '4',
                name: 'Datang Sendiri'
            },
            {
                id: '5',
                name: 'Dll'
            }
        ];

        this.pembiayaan = {};
        this.pembiayaans = [
            {
                id: '1',
                name: 'BPJS'
            },
            {
                id: '2',
                name: 'Biaya Sendiri'
            },
            {
                id: '3',
                name: 'Dll'
            }
        ];
    }

    getPasien() {
        this.Restangular.one('pasiens').customGET(this.$stateParams.id)
            .then(data => {
                this.data = data;
                this.nama = data.nama;

                this.jk = {
                    selected: {
                        name: this.data.jk
                    }
                };
                this.sk = {
                    selected: {
                        name: this.data.sk
                    }
                };
                this.dikirim = {
                    selected: {
                        name: this.data.dikirim
                    }
                };
                this.pembiayaan = {
                    selected: {
                        name: this.data.pembiayaan
                    }
                };
            });
    }

    lahir(r, l) {
        this.data.umur = moment(r).preciseDiff(moment(l));
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('pasiens').customPUT({
                    registrasi: this.data.registrasi,
                    tanggal: this.data.tanggal,
                    nama: this.data.nama,
                    lahir: this.data.lahir,
                    umur: this.data.umur,
                    jk: this.jk.selected.name,
                    suku: this.data.suku,
                    agama: this.data.agama,
                    pekerjaan: this.data.pekerjaan,
                    sk: this.sk.selected.name,
                    jalan: this.data.jalan,
                    lingkungan: this.data.lingkungan,
                    kelkec: this.data.kelkec,
                    kotakab: this.data.kotakab,
                    provinsi: this.data.provinsi,
                    telp: this.data.telp,
                    dikirim: this.dikirim.selected.name,
                    kdikirim: this.data.kdikirim,
                    pembiayaan: this.pembiayaan.selected.name,
                    kpembiayaan: this.data.kpembiayaan
                }, this.$stateParams.id)
                .then(() => {
                    this.$alert({
                        content: 'Data berhasil diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
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
    .controller('RkProfilController', RkProfilController);