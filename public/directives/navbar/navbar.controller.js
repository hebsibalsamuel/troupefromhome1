angular.module('troupe')
  .controller('navbarCtrl',function($scope,$mdDialog,$mdMedia,project) {
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    //function to create project
    $scope.createProject = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
         controller: CreateController,
         templateUrl: 'directives/navbar/addProjectChannel/createProjectDialog.tmpl.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
      });
      $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
     }, function(wantsFullScreen){
       $scope.customFullscreen = (wantsFullScreen === true);
     });
    };
    //function to create channel
    $scope.createChannel = function(ev) {
       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
       $mdDialog.show({
         controller: CreateController,
         templateUrl: 'directives/navbar/addProjectChannel/createChannelDialog.tmpl.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });
     };

     $scope.createChanne = function(ev) {
       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
       $mdDialog.show({
         controller: CreateController,
         templateUrl: 'directives/channel/model.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });
     };

     $scope.createCh = function(ev) {
       var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
       $mdDialog.show({
         controller: CreateController,
         templateUrl: 'directives/channel/emoji.html',
         parent: angular.element(document.body),
         targetEvent: ev,
         clickOutsideToClose:true,
         fullscreen: useFullScreen
       });
       $scope.$watch(function() {
         return $mdMedia('xs') || $mdMedia('sm');
       }, function(wantsFullScreen) {
         $scope.customFullscreen = (wantsFullScreen === true);
       });
     };




  });
  //controller for dialog
  function CreateController($scope, $mdDialog, $mdMedia,project) {

    angular.element(document).ready(function() {
      console.log(document.getElementById("editor"));
      ace.require("ace/ext/language_tools");
      var editor = ace.edit("editor");
      editor.setValue("some random text");
      var code = editor.getValue();
      console.log(code);
      editor.setTheme("ace/theme/solarized_light");
      editor.session.setMode("ace/mode/javascript");
      editor.setOption({
        enableBasicAutocompletion: true
      });
    });

    $scope.cancel = function() {

      $mdDialog.cancel();
    };

   $scope.snippet = function() {

     angular.element(document).ready(function() {


       var editor = ace.edit("editor");
       var code = editor.getValue();
       console.log(code);
     });



    };
    $scope.create  = function()
    {
        var newproject ={
            projectName : $scope.project.projectName,
            projectDescription:$scope.project.description,
            gitUserName:$scope.project.gitUserName,
            gitRepoName:$scope.project.gitRepoName,
            accessToken:$scope.project.accessToken
          };
          project.postProjects(newproject).success(function(data, status, headers, config) {
          $scope.projects = data;
           });
      $scope.project.projectName='';
      $scope.project.description='';
      $scope.project.gitUserName='';
      $scope.project.gitRepoName='';
      $scope.project.accessToken='';
      $scope.projectForm.$setPristine();
      $scope.projectForm.$setUntouched();
   };
    $scope.Invite = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
            controller: AddUsersControl,
            templateUrl:'directives/navbar/addProjectChannel/inviteDialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        });
        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };
    project.getProjects().success(function(projects) {
      $scope.projects= projects;
    });
      $scope.selectedProject;
      $scope.getSelectedText = function() {
         if ($scope.selectedProject !== undefined) {
           for(var i=0;i<$scope.projects.length;i++)
           {
             if($scope.projects[i].projectName==$scope.selectedProject)
             {
               $scope.projectId=$scope.projects[i].id;
               return $scope.selectedProject;
             }
           }
         }
          else {
           return "Please select a project";
         }
       };
      $scope.addChannel  = function()
      {
           var id=$scope.projectId;
            var newChannel ={channels:[{ channelName : $scope.channel.channelName}]};
            project.patchSpecProjects(id,newChannel).success(function(data, status, headers, config) {
            $scope.projects = data;
             });
            $scope.channelForm.$setPristine();
            $scope.channelForm.$setUntouched();
      };
      $scope.createChannel = function(ev) {
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
         $mdDialog.show({
             controller: CreateController,
             templateUrl: 'directives/navbar/addProjectChannel/createChannelDialog.tmpl.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: useFullScreen
         });
         $scope.$watch(function() {
           return $mdMedia('xs') || $mdMedia('sm');
         }, function(wantsFullScreen) {
           $scope.customFullscreen = (wantsFullScreen === true);
         });
      };
      $scope.addUsersToChannel = function(ev) {
         var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
         $mdDialog.show({
             controller: SelectUsersControl,
             controllerAs: 'ctrl',
             templateUrl: 'directives/navbar/addProjectChannel/addUsersToChannelDialog.tmpl.html',
             parent: angular.element(document.body),
             targetEvent: ev,
             clickOutsideToClose:true,
             fullscreen: useFullScreen
         });
         $scope.$watch(function() {
           return $mdMedia('xs') || $mdMedia('sm');
         }, function(wantsFullScreen) {
           $scope.customFullscreen = (wantsFullScreen === true);
         });
      };
  }
  function AddUsersControl($scope, $mdDialog, $mdMedia, project) {
    $scope.final_arr = [];
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    project.getProjects().success(function(projects) {
      $scope.max=0;
      for(var i=0;i<projects.length;i++)
      {
        $scope.final_arr.push(projects[i].id);
        if(projects[i].id> $scope.max){
          $scope.max = projects[i].id;
        }
      }
    });
    $scope.addMembers = function()
    {
      max = $scope.max;
      var user ={users :[{email : $scope.email, userName:$scope.userName}]};
      project.patchSpecProjects(max,user).success(function(data, status, headers, config) {
        $scope.projects = data;
      });
      $scope.email='';
      $scope.userName='';
      $scope.invite.$setPristine();
      $scope.invite.$setUntouched();
    };
}
function SelectUsersControl($scope, $mdDialog, $mdMedia, project, $q, $timeout) {
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
   //*************js for contact chips********************
   var self = this;
   var cancelSearch = angular.noop;
   var cachedQuery, lastSearch;
  // self.allContacts = loadContacts();
   //console.log(self.allContacts);
  // self.contacts = [self.allContacts[0]];
  //  console.log(self.contacts);
   self.filterSelected = true;
   self.querySearch = querySearch;

    // Search for contacts; use a random delay to simulate a remote call
   function querySearch (criteria) {
     cachedQuery = cachedQuery || criteria;
     return cachedQuery ? self.allContacts.filter(createFilterFor(cachedQuery)) : [];
   }
    // Create filter function for a query string
   function createFilterFor(query) {
     var lowercaseQuery = angular.lowercase(query);
     return function filterFn(contact) {
       return (contact._lowername.indexOf(lowercaseQuery) != -1);;
     };
   }
  //  function loadContacts() {
  //     $scope.usersOfProject=[];
   //
  //     return project.getProjects().success(function(projects) {
  //      $scope.projects= projects;
   //
  //      for(var i=0;i<$scope.projects.length;i++){
  //          if($scope.projects[i].projectName=="Troupe"){
  //            $scope.users=$scope.projects[i].users;
  //            for(var j=0;j<$scope.users.length;j++){
  //              $scope.usersOfProject[j]=$scope.users[j].userName;
  //            }
  //          }
  //      }
  //      var contacts = $scope.usersOfProject;
  //      return contacts;
      //  return contacts.map(function (c) {
      //         // var cParts = c.split(' ');
      //         var contact = {
      //           name: c,
      //         };
      //         contact._lowername = contact.name.toLowerCase();
      //       // for(var i=0;i<contacts.length;i++)
      //         return contact;
      //       });
  // });
    //  $scope.cs = $scope.usersOfProject;
    // // console.log($scope.usersOfProject.length);
    //  return $scope.cs.map(function (c) {
    //         // var cParts = c.split(' ');
    //         var contact = {
    //           name: c,
    //
    //         };
    //
    //
    //         contact._lowername = contact.name.toLowerCase();
    //       // for(var i=0;i<contacts.length;i++)
    //
    //         return contact;
    //       });
        // }


  }
