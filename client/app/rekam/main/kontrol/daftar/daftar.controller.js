'use strict';

class RkKontrolDaftarController {

    constructor(Restangular, $stateParams, $alert, blockUI, $timeout) {
        this.Restangular = Restangular;
        this.$stateParams = $stateParams;
        this.$alert = $alert;
        this.block = blockUI.instances.get('block');
        this.$timeout = $timeout;

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
        this.Restangular.one('kontrols').customGET(this.$stateParams.id)
            .then(data => {
                this.$timeout(() => {
                    this.data = data;
                    this.nama = this.data._pasien.nama;
                    this.nodata = this.data.kontrol.length < 1;

                    this.map = _.map(this.data.kontrol, function (val) {
                        return {
                            _id: val._id,
                            tanggal: val.tanggal,
                            pemeriksaan: val.pemeriksaan,
                            keluhan: val.keluhan.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                            lab: val.lab.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                            sputum: val.sputum.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                            mt: val.mt.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                            bb: val.bb,
                            tb: val.tb,
                            diagnosaid: val.diagnosaid,
                            diagnosaname: val.diagnosaname,
                            terapi: val.terapi.replace(/(?:\r\n|\r|\n)/g, '<br/>')
                        };
                    });

                    this.block.stop();
                }, 1000);
            });
    }
}

angular.module('kpmApp.rekam')
    .controller('RkKontrolDaftarController', RkKontrolDaftarController);