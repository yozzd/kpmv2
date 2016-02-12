'use strict';

class gdDaftarKeluarController {

    constructor(Restangular, blockUI, $timeout) {
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Restangular = Restangular;

        this.opt1 = [
            {
                id: 1,
                name: 'Januari'
            },
            {
                id: 2,
                name: 'Februari'
            },
            {
                id: 3,
                name: 'Maret'
            },
            {
                id: 4,
                name: 'April'
            },
            {
                id: 5,
                name: 'Mei'
            },
            {
                id: 6,
                name: 'Juni'
            },
            {
                id: 7,
                name: 'Juli'
            },
            {
                id: 8,
                name: 'Agustus'
            },
            {
                id: 9,
                name: 'September'
            },
            {
                id: 10,
                name: 'Oktober'
            },
            {
                id: 11,
                name: 'November'
            },
            {
                id: 12,
                name: 'Desember'
            }
        ];

        moment.locale('id');
        this.m = moment().format('MMMM');
        this.y = new Date().getFullYear();

        this.month = {
            selected: {
                name: this.m
            }
        };
        this.months = this.opt1;

        this.year = {
            selected: {
                name: this.y
            }
        };
        this.years = _.map(_.range(2010, this.y + 1, 1), function (v, k) {
            return {
                id: k,
                name: v.toString(),
            };
        });

        this.getKeluar(this.m, this.y);
    }

    getKeluar(m, y) {
        this.block.start();
        this.Restangular.all('keluars').customGETLIST()
            .then(datas => {
                this.$timeout(() => {
                    this.datas = datas;

                    this.filter = _.chain(this.datas).filter(function (val) {
                        return moment(val.tanggal).format('MMMM') === m.toString() && moment(val.tanggal).format('YYYY') === y.toString();
                    }).value();

                    this.bydate = _.chain(this.filter).map(function (val) {
                        return val.tanggal;
                    }).uniq().sortBy().value();
                    this.nodata = this.bydate.length < 1;

                    this.block.stop();
                }, 1000);
            });
    }

    change(m, y) {
        this.getKeluar(m, y);
    }
}

angular.module('kpmApp.gudang')
    .controller('gdDaftarKeluarController', gdDaftarKeluarController);