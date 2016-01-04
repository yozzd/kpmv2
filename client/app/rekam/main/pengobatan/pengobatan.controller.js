'use strict';

class RkPengobatanController {

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
                name: 'I'
            },
            {
                id: 2,
                name: 'II'
            }
        ];

        this.tb = {};
        this.tbs = this.opt1;
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('pengobatans').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    if (this.data.tb === '') {
                        this.tb = {
                            selected: null
                        };
                    } else {
                        this.tb = {
                            selected: {
                                name: this.data.tb
                            }
                        };
                    }

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            this.Restangular.one('pengobatans').customPUT({
                    tb: this.tb.selected === null ? '' : this.tb.selected.name,
                    tb1: this.data.tb1,
                    tb2: this.data.tb2,
                    tb3: this.data.tb3,
                    tb4: this.data.tb4,
                    tb5: this.data.tb5,
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
            this.Restangular.one('pengobatans').customPUT({
                    nontb1: this.data.nontb1,
                    nontb2: this.data.nontb2,
                    nontb3: this.data.nontb3,
                    nontb4: this.data.nontb4,
                    nontb5: this.data.nontb5,
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
    .controller('RkPengobatanController', RkPengobatanController);