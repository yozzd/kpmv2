'use strict';

class SettingsController {
    //start-non-standard
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $timeout, $state, $scope) {
        this.Auth = Auth;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$scope = $scope;
    }

    changePassword(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.$scope.$broadcast('timer-start');
                    this.$timeout(() => {
                        this.$state.go('logout');
                    }, 6000);
                    this.message = 'Password berhasil diubah. Silahkan logout dan login kembali dengan password baru anda';
                })
                .catch(() => {
                    form.password.$setValidity('mongoose', false);
                    this.errors.other = 'Password salah';
                    this.message = '';
                });
        }
    }
}

angular.module('kpmApp')
    .controller('SettingsController', SettingsController);