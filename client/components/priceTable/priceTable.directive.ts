'use strict';

angular.module('referralApp')
  .directive('priceTable', function () {
    return {
      templateUrl: 'components/priceTable/priceTable.html',
      restrict: 'EA'
    };
  });
