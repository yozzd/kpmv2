'use strict';

class SettingsController {
    //start-non-standard
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $timeout, $state, $interval) {
        this.Auth = Auth;
        this.$timeout = $timeout;
        this.$state = $state;
        this.$interval = $interval;

        this.countdown = 5;

    }

    stop() {
        if (angular.isDefined(this.timer)) {
            this.$interval.cancel(this.timer);
        }
    };

    changePassword(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
                .then(() => {
                    this.timer = this.$interval(() => {
                        if (this.countdown !== 0) {
                            this.countdown--;
                        } else {
                            this.stop();
                            this.$state.go('logout', {}, {
                                reload: true
                            });
                        }
                    }, 1000);
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