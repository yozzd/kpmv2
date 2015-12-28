'use strict';

class RkCreateController {

    constructor(Restangular, $alert) {
        this.Restangular = Restangular;
        this.$alert = $alert;

        this.data = {};
        this.submitted = false;

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

    lahir(tgl) {
        this.data.umur = moment(tgl).toNow(true);
    }

    submit(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.all('pasiens').customPOST({
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
                })
                .then(() => {
                    this.$alert({
                        content: 'Data berhasil disimpan',
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
    .controller('RkCreateController', RkCreateController);