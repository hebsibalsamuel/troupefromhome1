angular.module('troupe')
 .service('user',function($http) {
   this.getUsers = function() {

     return $http.get("http://10.219.85.116:3000/users");
   }
 });
