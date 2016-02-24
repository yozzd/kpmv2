'use strict';

(function () {

    angular.module('kpmApp.auth')
        .run(function ($rootScope, $state, Auth, Permission, $q) {
            // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
            $rootScope.$on('$stateChangeStart', function (event, next) {

                if (!next.authenticate) {
                    return;
                }

                if (typeof next.authenticate === 'string') {
                    Auth.hasRole(next.authenticate, _.noop).then(has => {
                        if (has) {
                            return;
                        }

                        event.preventDefault();
                        return Auth.isLoggedIn(_.noop).then(is => {
                            $state.go(is ? 'main' : 'login');
                        });
                    });
                } else {
                    Auth.isLoggedIn(_.noop).then(is => {
                        if (is) {
                            return;
                        }

                        event.preventDefault();
                        $state.go('main');
                    });
                }
            });

            //angular-permission
            Permission
                .defineRole('admin', function () {
                    var deferred = $q.defer();
                    Auth.getCurrentUser(function (data) {
                        if (data.role === 'admin') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                })
                .defineRole('gudang', function () {
                    var deferred = $q.defer();
                    Auth.getCurrentUser(function (data) {
                        if (data.role === 'gudang') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                })
                .defineRole('apotek', function () {
                    var deferred = $q.defer();
                    Auth.getCurrentUser(function (data) {
                        if (data.role === 'apotek') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                })
                .defineRole('rekam', function () {
                    var deferred = $q.defer();
                    Auth.getCurrentUser(function (data) {
                        if (data.role === 'rekam') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }, function () {
                        deferred.reject();
                    });
                    return deferred.promise;
                });
        });

})();