'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  },
  {
    'title': 'Refer',
    'state': 'referral'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state, $scope) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.state = $state;
  }
}

angular.module('referralApp')
  .controller('NavbarController', NavbarController);
