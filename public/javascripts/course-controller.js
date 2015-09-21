scotchApp.controller('courseController', function($scope, $http,  $interval, $routeParams, $modal, $log) {
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

	$scope.open = function (id) {
		console.log(id);
		$scope.items = ['item1', 'item2', 'item3'];
	    var modalInstance = $modal.open({
	     //animation: $scope.animationsEnabled,
	     templateUrl: '/pages/page-add-video.html',
	     controller: 'courseModalController',
	     size: null,
	     resolve: {
	        id: function () {
	          return id;
	        }
	      }
    });

    modalInstance.result.then(function (success) {

    	if (success) {
    		$http.get('/course').
	 		 then(function(response) {
	  			$scope.courses = response.data;
	 		 }, function(response) {
		  	 	//failure
		  	 });
    	};

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


}).config(['$sceDelegateProvider', function($sceDelegateProvider) {
$sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
]);
}]);


scotchApp.controller('courseModalController', function($scope, $http, $modalInstance, id) {
	$scope.id = id;
	$scope.ok = function () {
    	$modalInstance.close($scope.success);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};

  	$scope.save= function(id, name, url){
  	dataObj = {id: $scope.id,
  			  name: name,
  			  url: url}
  			  console.log(dataObj)
  	var res = $http.post('/course', dataObj).
			success(function(data, status, headers, config) {
    			// this callback will be called asynchronously
    			// when the response is available
    			$scope.success = true;
    			console.log('it is working');
    			$modalInstance.close($scope.success);
    	      	}).
 	 		error(function(data, status, headers, config) {
 	 			$scope.success = false;
    			// called asynchronously if an error occurs
    			// or server returns response with an error status.
  			});

 	 }

});