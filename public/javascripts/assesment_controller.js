angular.module('classroom', []).controller('assesmentController', function($scope, $http, $interval){
	
	$scope.isha_tests =   [false, false, false, false, false, false, false, false];
	$scope.causin_tests = [false, false, false, false, false, false, false, false];

	$scope.play =function(value) {
		if(value == true) {

		var aud = new Audio();
		aud.src = 'yeah.mp3';
		 
		//You could also do
		var aud = new Audio('yeah.mp3');
		 
		//Now lets play the music
		aud.play();	
		
	}
		
	}

	$scope.reset = function() {

	$scope.isha_tests =   [false, false, false, false, false, false, false, false];
	$scope.causin_tests = [false, false, false, false, false, false, false, false];

		var causin_test_counter = 0
		var counter = 0
		var rand = 0
		$interval(function() {

			 	if (causin_test_counter < $scope.causin_tests.length) {	
				  
		          counter = counter + 1;
		          rand = Math.floor(Math.random() * 30) + 1;
		          if (counter > 10 && counter <= rand) {
		          	causin_test_counter +=1;	
		          	$scope.causin_tests[causin_test_counter-1] = true
		          	counter = 0;
		          };
		        }  

		}, 1000);
	}
});
