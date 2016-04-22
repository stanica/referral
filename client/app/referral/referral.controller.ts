'use strict';
(function(){

class ReferralController {
  
	constructor($http, $stateParams) {
		this.$http = $http;
		this.info = {};
		this.referralId = $stateParams.id
		this.message;
	}

	$onInit() {
		this.$http.get('/api/owners/referral/' + this.referralId).then(response => {
			this.info = response.data;
			$('#search-bg').css('background-image', 'url(' + response.data.photo + ')');
		});
	}
}

angular.module('referralApp')
  .component('referral', {
    templateUrl: 'app/referral/referral.html',
    controller: ReferralController,
    controllerAs: 'referral'
  });

})();
