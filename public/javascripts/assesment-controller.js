scotchApp.controller('assesmentController', function($scope, $http, $interval) {
        $scope.isha_tests =   [false, false, false, false, false, false, false, false];
        $scope.causin_tests = [false, false, false, false, false, false, false, false];

        $scope.final_score = function() {   
            $http.get('/api/score').
              then(function(response) {
                    $scope.score = response.data;
                    $scope.aishwarya = response.data[0];
                    $scope.causin = response.data[1];
                    $scope.no_of_aishwarya_gold = new Array($scope.aishwarya.gold_score)
                    $scope.no_of_causin_gold = new Array($scope.causin.gold_score)
              }, function(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
              });
        };    

          $scope.add_score= function(name){
            var person = {};
            if(name=="aishwarya") {
                person = $scope.aishwarya
            }
            else{
                person = $scope.causin
            }

            dataObj = {id: person._id,
                      gold_score: person.gold_score + 1
                    }
            var res = $http.post('/api/score', dataObj).
                     success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('it is working');
                $scope.play(true, 'winning');
                $scope.final_score();   
            }).
             error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

          };


        $scope.play =function(value, type) {
            if(value == true) {

            var aud = new Audio();
            
            if(type == 'yeah')  {
                aud.src = '/sounds/yeah.mp3';            
                //You could also do
                var aud = new Audio('/sounds/yeah.mp3');}
            else{
                aud.src = '/sounds/winning.wav';             
                //You could also do
                var aud = new Audio('/sounds/winning.wav');
            }
             
            //Now lets play the music
            aud.play(); 
            
        }};
            
        $scope.stop = function() {
            $scope.reset = true
        };

        $scope.start = function() {
        $scope.reset = false    
        $scope.isha_tests =   [false, false, false, false, false, false, false, false];
        $scope.causin_tests = [false, false, false, false, false, false, false, false];

            var causin_test_counter = 0
            var interval = 0
            var min = 10
            var max = 20
            var rand = Math.floor(Math.random() * (max - min)) + min;

            $interval(function() {

                    if($scope.reset == true) {
                        return;
                    }

                    if (causin_test_counter < $scope.causin_tests.length) { 
                    interval += 1;    
                    console.log(interval);                    
                      if (interval >= rand) {
                            causin_test_counter +=1;    
                            $scope.causin_tests[causin_test_counter-1] = true
                            interval = 0;
                            rand = Math.floor(Math.random() * (max - min)) + min;
                      };
                    }  

            }, 1000)
        };
        
        $scope.final_score();   
    });
