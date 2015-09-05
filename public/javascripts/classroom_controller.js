angular.module('classroom', []).controller('courseController', function($scope, $http){
	$scope.text = "New Text";
	$scope.name = "";
	$scope.youtubeurl = "";

	$http.get('/course').
	  then(function(response) {

	  	$scope.courses = response.data;
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });


	  $scope.save= function(id, name, url){
	  	console.log(id);
	  	dataObj = {id: id,
	  			  name: name,
	  			  url: url}
	  	var res = $http.post('/course', dataObj).
   			 success(function(data, status, headers, config) {
        	// this callback will be called asynchronously
        	// when the response is available
        	console.log('it is working');
		$http.get('/course').
			  then(function(response) {
			  	$scope.courses = response.data;
			  }, function(response) {
			  });
        	      	}).
     	 error(function(data, status, headers, config) {
        	// called asynchronously if an error occurs
        	// or server returns response with an error status.
      	});

	  }

}).config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
}]);

