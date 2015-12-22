'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main',
                authenticate: 'true'
            });
    });