angular.module('troupe',['ngMaterial','ui.router','luegg.directives','ngAnimate'])
  .run(function($rootScope,$http,$location) {
    // to support multiple users only for demo purpose
    var username = $location.$$absUrl.split('=')[1];
    username = username.substring(0,username.length-2);
    $http.get('http://10.219.85.116:3000/users?username='+username).success(function(user) {
      $rootScope.tiles = user[0].tile;
      $rootScope.userName = user[0].username;
    });
  })
 .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
                .state('/', {
                     url: '/',
                     templateUrl: 'views/main.tmpl.html'
                 })
                 .state('editProfile', {
                    url: '/editProfile',
                   templateUrl: 'directives/navbar/editProfile/editProfile.tmpl.html'
                 })
                 .state('editProfile.viewProfile', {
                   url: '/viewProfile',
                   templateUrl: 'directives/navbar/editProfile/viewProfile.tmpl.html'
                 })
                 .state('editProfile.projectManage', {
                   url: '/projectManage',
                   templateUrl: 'directives/navbar/editProfile/projectManage.tmpl.html'
                 })
                 .state('editProfile.privacy', {
                   url: '/privacy',
                   templateUrl: 'directives/navbar/editProfile/privacy.tmpl.html'
                 });

         });
