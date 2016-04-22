(function(angular, undefined) {
'use strict';

angular.module('referralApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','client','owner','admin']})

;
})(angular);