scotchApp.controller('courseController', function($scope, $http,  $interval, $routeParams, $modal, $log, $localStorage, Auth) {

	$scope.youtubeurl = "";
	$scope.height = "250px";
	$scope.width  = "350px";

	$scope.mouseover = function() {
		console.log('mouse')
		$scope.height = "300px";
		$scope.width  = "400px";
	}

	$scope.mousedown = function() {
		$scope.height = "250px";
		$scope.width  = "350px";
	}

	$http.get('/api/course').
	  then(function(response) {

	  	$scope.courses = response.data;
	    // this callback will be called asynchronously
	    // when the response is available
	  }, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

	 $scope.authorized = function (requestedScope) {

	 	if (! Auth.getTokenClaims().scope) {
	 		return false;
	 	}

		if ((Auth.getTokenClaims().scope).indexOf(requestedScope) >= 0 ) {
			return true;
		}	

		return false
	};


	$scope.open = function (id) {
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
    		$http.get('/api/course').
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
  	var res = $http.post('/api/course', dataObj).
			success(function(data, status, headers, config) {
    			// this callback will be called asynchronously
    			// when the response is available
    			$scope.success = true;
    			$modalInstance.close($scope.success);
    	      	}).
 	 		error(function(data, status, headers, config) {
 	 			$scope.success = false;
    			// called asynchronously if an error occurs
    			// or server returns response with an error status.
  			});

 	 }

});