scotchApp.controller('loginController', function($scope, $rootScope, $http, $localStorage, $location, Auth) {

	$scope.message = null

	$scope.login = function() {
		
		Auth.login(
			{
	    		name: $scope.username,
	         	password: $scope.password
	   		}, 
        	function(data){
        		$localStorage.token = data.token;
        		$location.path('/welcome')
  			}, 
  		 	function(message){
           		$scope.message = message.message;
           		$location.path('/')
        	}    
	    );
	};

	$scope.logout = function() {
	        Auth.logout(function() {
	        	console.log('Logged Out')
	        });
	 };



});