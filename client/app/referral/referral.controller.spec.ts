'use strict';

describe('Component: ReferralComponent', function () {

  // load the controller's module
  beforeEach(module('referralApp'));

  var ReferralComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ReferralComponent = $componentController('ReferralComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
