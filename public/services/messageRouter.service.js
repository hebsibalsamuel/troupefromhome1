angular.module('troupe')
  .service('messageRouter', function($rootScope,$http) {

        $http.get('http://10.219.85.116:3000/message').success(function(message) {
          message.forEach(function(message) {
            $rootScope.$broadcast('message',message);
          });
        })

  });
