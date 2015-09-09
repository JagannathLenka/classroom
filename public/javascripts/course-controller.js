scotchApp.controller('courseController', function($scope, $http, $interval, $routeParams) {
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
	  	dataObj = {id: $routeParams.id,
	  			  name: name,
	  			  url: url}
	  			  console.log(dataObj)
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

