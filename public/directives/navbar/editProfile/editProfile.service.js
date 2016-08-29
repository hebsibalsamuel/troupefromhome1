angular.module('troupe')
  .service('editProfile', function($http) {
    this.getMessages = function() {
      return $http.get('http://10.219.85.116:3000/profile');
    }
  });
