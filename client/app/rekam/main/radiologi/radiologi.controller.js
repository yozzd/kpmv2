'use strict';

class RkRadiologiController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout, Upload, $window) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;
        this.Upload = Upload;
        this.$window = $window;

        this.id = this.$stateParams.id;

        this.data = {};
        this.submitted = false;

        this.blockmessage = 'Loading ...';
        this.getPasien();
    }

    getPasien() {
        this.block.start({
            message: this.blockmessage
        });
        this.Restangular.one('radiologis').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = data._pasien.nama;

                    this.block.stop();
                }, 1000);
            });
    }

    submit1(form) {
        this.submitted = true;
        if (form.$valid) {
            if (this.file === undefined) {
                this.Restangular.one('radiologis').customPUT({
                        thorakpatgl: this.data.thorakpatgl,
                        thorakpahasil: this.data.thorakpahasil,
                        thorakcttgl: this.data.thorakcttgl,
                        thorakcthasil: this.data.thorakcthasil,
                        thorakusgtgl: this.data.thorakusgtgl,
                        thorakusghasil: this.data.thorakusghasil
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
            } else {
                this.file.upload = this.Upload.upload({
                    url: '/api/radiologis/files/' + this.data._id,
                    file: this.file,
                    method: 'PUT',
                    fields: {
                        thorakpatgl: this.data.thorakpatgl === null ? '' : this.data.thorakpatgl,
                        thorakpahasil: this.data.thorakpahasil,
                        thorakcttgl: this.data.thorakcttgl === null ? '' : this.data.thorakcttgl,
                        thorakcthasil: this.data.thorakcthasil,
                        thorakusgtgl: this.data.thorakusgtgl === null ? '' : this.data.thorakusgtgl,
                        thorakusghasil: this.data.thorakusghasil
                    }
                });
                this.file.upload
                    .then(() => {
                        this.blockmessage = 'Updating ...';
                        this.getPasien();
                    });
            }
        }
    }
}

angular.module('kpmApp.rekam')
    .controller('RkRadiologiController', RkRadiologiController);