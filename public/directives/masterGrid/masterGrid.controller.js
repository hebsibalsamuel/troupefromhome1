var app1=angular.module('troupe')
  .controller('masterGridCtrl', masterGridCtrl);

  function masterGridCtrl($scope,$mdDialog,$http,$rootScope){
       $scope.count=3;
    //   $scope.colors =  [
    //     '#7bd148',
    //     '#5484ed',
    //     '#a4bdfc',
    //     '#46d6db',
    //     '#7ae7bf',
    //     '#51b749',
    //     '#fbd75b',
    //     '#ffb878',
    //     '#ff887c',
    //     '#dc2127',
    //     '#dbadff',
    //     '#e1e1e1'
    // ];

    $scope.colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


       $scope.showCustom = function(event) {
           $mdDialog.show({
              clickOutsideToClose: true,
              scope: $scope,        
              preserveScope: true,          
              templateUrl: 'directives/masterGrid/addTile/createTileDialog.tmpl.html',
              controller: function masterGridCtrl($scope,$mdDialog) {
                             $scope.cancel = function() {
                                   $mdDialog.hide();
                             }
              }
           });
       };

  $http.get("http://10.219.85.116:3000/tiles")
    .then(function(response) {
    $rootScope.msg = response.data;  //First function handles success
    }, function(response) {
    $scope.content = "Something went wrong";   //Second function handles error
    });

     $scope.addtile = function(tile,tileWidth,tileHeight,tileColor) {
        $scope.tileObj={};
        $scope.tileObj.channelid=[];
        $scope.tileObj.tileName=tile;

       if(tileWidth==="Small"){
          $scope.tileObj.row=2;
          $scope.tileObj.column=2;
        }
        else if(tileWidth==="Medium"){
          $scope.tileObj.row=3;
          $scope.tileObj.column=3;
        }
        else if(tileWidth==="Large"){
          $scope.tileObj.row=2;
          $scope.tileObj.column=4;
        }
        $scope.tileObj.colour=tileColor;
        console.log($scope.tileObj);
        var h =JSON.stringify($scope.tileObj);
        $http.post("http://10.219.85.116:3000/tiles", h).
            success(function(data, status, headers, config) {
                $rootScope.tiles.push($scope.tileObj);
            }).
            error(function(data, status, headers, config) {});

        $mdDialog.hide();
     }


  };
