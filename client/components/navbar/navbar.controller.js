'use strict';

class NavbarController {
    //start-non-standard
    menu = [{
        'title': 'Home',
        'state': 'main'
    }];
    //end-non-standard

    constructor(Auth) {
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.isRekam = Auth.isRekam;
        this.getCurrentUser = Auth.getCurrentUser;
    }
}

angular.module('kpmApp')
    .controller('NavbarController', NavbarController);