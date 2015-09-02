angular.module('classroom', []).controller('courseController', function($scope, $http){
	$scope.text = "New Text";

	$http.get('/course').
	  then(function(response) {

	  	$scope.courses = response.data;
	  	console.log(response);
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
});

