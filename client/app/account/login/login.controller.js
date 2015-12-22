'use strict';

class LoginController {
    //start-non-standard
    user = {};
    errors = {};
    submitted = false;
    //end-non-standard

    constructor(Auth, $state) {
        this.Auth = Auth;
        this.$state = $state;

        var d = new Date();
        this.y1 = parseInt(2015);
        this.y2 = d.getFullYear();
    }

    login(form) {
        this.submitted = true;

        if (form.$valid) {
            this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    // Logged in, redirect to home
                    this.$state.go('main');
                })
                .catch(err => {
                    this.errors.other = err.message;
                });
        }
    }
}

angular.module('kpmApp')
    .controller('LoginController', LoginController);