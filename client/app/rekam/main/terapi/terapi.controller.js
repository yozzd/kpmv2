'use strict';

class RkTerapiController {

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
                name: 'Percobaan'
            },
            {
                id: 2,
                name: 'Aspirasi'
            }
        ];

        this.opt = {
            1: 'Nebulizer',
            2: 'Punctie Pleura',
            3: 'Water Sealed Drainage (WSD)',
            4: 'Pleurodesis'
        };

        this.punctie = {};
        this.puncties = this.opt1;

        this.dis = true;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('terapis').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.terapi === '') {
                        this.terapi = {
                            opt: []
                        };
                    } else {
                        this.terapi = {
                            opt: this.data.terapi.split(',')
                        };
                    }


                    if (this.data.punctie === '') {
                        this.punctie = {
                            selected: null
                        };
                    } else {
                        this.punctie = {
                            selected: {
                                name: this.data.punctie
                            }
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    cek(x) {
        this.find = _.findIndex(x, function (chr) {
            return chr === '2';
        });
        if (this.find === -1) {
            this.dis = true;
            this.punctie = {
                selected: null
            };
            this.data.kpunctie = '';
        } else {
            this.dis = false;
        }
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('terapis').customPUT({
                    terapi: this.terapi.opt.toString(),
                    punctie: this.punctie.selected === null ? '' : this.punctie.selected.name,
                    kpunctie: this.data.kpunctie,
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
    .controller('RkTerapiController', RkTerapiController);