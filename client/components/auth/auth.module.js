'use strict';

angular.module('kpmApp.auth', [
  'kpmApp.constants',
  'kpmApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
