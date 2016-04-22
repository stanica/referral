'use strict';

angular.module('referralApp')
  .controller('OauthButtonsCtrl', function($window, $stateParams) {
    this.loginOauth = function(provider) {
		if ($stateParams.id) {
			$window.location.href = '/auth/' + provider + '/' + $stateParams.id;
		}
		else {
			$window.location.href = '/auth/' + provider;
		}
    };
  });
