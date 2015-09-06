angular.module('classroom', []).controller('assesmentController', function($scope, $http, $interval){
	
	$scope.isha_tests =   [false, false, false, false, false, false, false, false];
	$scope.causin_tests = [false, false, false, false, false, false, false, false];


	$http.get('/score').
	  then(function(response) {

	  	$scope.score = response.data;
	    // this callback will be called asynchronously
	    // when the response is available
	    $scope.aishwarya = response.data[0]
	    $scope.causin = response.data[1]


	    $scope.final_score = function(name) {
			var  number_of_gold = 0
			if(name=="aishwarya") {
					number_of_gold = $scope.aishwarya.gold_score || 0
		  	}
		  	else {
		  		number_of_gold = $scope.causin.gold_score || 0
		  	}
		  	return new Array(number_of_gold);
		};

	  }, function(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });


	  $scope.add_score= function(name){
	  	dataObj = {id: $scope.aishwarya._id,
	  			  gold_score: $scope.aishwarya.gold_score + 1
	  			}
	  	var res = $http.post('/score', dataObj).
				 success(function(data, status, headers, config) {
	    	// this callback will be called asynchronously
	    	// when the response is available
	    	console.log('it is working');
		$http.get('/score').
			  then(function(response) {
			  	$scope.score = response.data;
			  	$scope.aishwarya = response.data[0]
	    		$scope.causin = response.data[1]
			  }, function(response) {
			  });
	    	      	}).
	 	 error(function(data, status, headers, config) {
	    	// called asynchronously if an error occurs
	    	// or server returns response with an error status.
	  	});

	  };


	$scope.play =function(value) {
		if(value == true) {

		var aud = new Audio();
		aud.src = 'yeah.mp3';
		 
		//You could also do
		var aud = new Audio('yeah.mp3');
		 
		//Now lets play the music
		aud.play();	
		
	}};
		

	$scope.reset = function() {

	$scope.isha_tests =   [false, false, false, false, false, false, false, false];
	$scope.causin_tests = [false, false, false, false, false, false, false, false];

		var causin_test_counter = 0
		var counter = 0
		var rand = 0
		$interval(function() {

			 	if (causin_test_counter < $scope.causin_tests.length) {	
			 		console.log(causin_test_counter)
				  
		          counter = counter + 1;
		          rand = Math.floor(Math.random() * 20) + 1;
		          if (counter > 10 && counter <= rand) {
		          	causin_test_counter +=1;	
		          	$scope.causin_tests[causin_test_counter-1] = true
		          	counter = 0;
		          };
		        }  

		}, 1000)
	};

});
