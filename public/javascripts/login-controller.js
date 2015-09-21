scotchApp.controller('loginController', function($scope, $http, $localStorage, $location) {

	$scope.message = null

	$scope.login = function() {
		
	    var url = '/users/signin'
	    return $http.post(url, {
	    	 name: $scope.username,
	         password: $scope.password
	    }).success(function(data){
	    	console.log(data);
	        $localStorage.token = data.token;
	        $location.path('/welcome');

	    }).error(function(message){
	            $scope.message = message.message;

	    	});
	 };

});