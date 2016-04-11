'use strict';

angular.module('referralApp.auth', [
  'referralApp.constants',
  'referralApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
