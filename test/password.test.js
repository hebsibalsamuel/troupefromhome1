describe('PasswordController', function() {

	beforeEach(module('app'));

	var $controller;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('$scope grade', function() {
		it('sets the strength of the password as weak if the length is lesser than 3', function() {
			var $scope = {};
			var controller = $controller('PasswordController', { $scope:$scope });
			$scope.password = "ram";
			$scope.grade();
			expect($scope.strength).to.equal('Weak');
		});
	});

});
