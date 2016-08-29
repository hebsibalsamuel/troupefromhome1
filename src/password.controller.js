angular.module('app',[])
	.controller('PasswordController', function($scope) {
		$scope.password = '';
		$scope.grade = function() {
			var size = $scope.password.length;
			if(size > 8) {
				$scope.strength = "Strong";
			} else if(size > 3) {
				$scope.strength = "Medium";
			} else {
				$scope.strength = "Weak";
			}
		};

	});
