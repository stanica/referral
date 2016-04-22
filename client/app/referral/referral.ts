'use strict';

angular.module('referralApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('referral', {
        url: '/:id',
        template: '<referral></referral>',
        hideNavbar: true
      });
  });
