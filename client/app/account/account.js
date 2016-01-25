'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/account/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('logout', {
                url: '/logout?referrer',
                referrer: 'login',
                template: '',
                controller: function ($state, Auth) {
                    var referrer = 'login';
                    Auth.logout();
                    $state.go(referrer);
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupController',
                controllerAs: 'vm'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsController',
                controllerAs: 'vm',
                authenticate: true
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'app/account/forbidden/forbidden.html'
            });
    })
    .run(function ($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
            if (next.name === 'logout' && current && current.name && !current.authenticate) {
                next.referrer = current.name;
            }
        });
    });