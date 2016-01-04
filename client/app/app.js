'use strict';

angular.module('kpmApp', [
    'kpmApp.auth',
    'kpmApp.admin',
    'kpmApp.rekam',
    'kpmApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'validation.match',
    'mgcrea.ngStrap',
    'ngAnimate',
    'restangular',
    'ncy-angular-breadcrumb',
    'blockUI',
    'ui.select',
    'ngFileUpload',
    'checklist-model'
])
    .config(function ($urlRouterProvider, $locationProvider, RestangularProvider, blockUIConfig, uiSelectConfig) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setDefaultHttpFields({
            cache: false
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation) {
            if (operation === 'remove') {
                return undefined;
            }
            return elem;
        });

        blockUIConfig.delay = 0;
        blockUIConfig.autoBlock = false;

        uiSelectConfig.theme = 'select2';
    });