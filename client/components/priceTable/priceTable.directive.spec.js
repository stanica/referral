'use strict';

describe('Directive: priceTable', function () {

  // load the directive's module and view
  beforeEach(module('referralApp.priceTable'));
  beforeEach(module('app/directives/priceTable/priceTable.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<price-table></price-table>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the priceTable directive');
  }));
});
