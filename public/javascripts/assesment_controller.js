scotchApp.controller('assesmentController', function($scope, $http, $interval) {
        $scope.isha_tests =   [false, false, false, false, false, false, false, false];
        $scope.causin_tests = [false, false, false, false, false, false, false, false];

        $scope.final_score = function() {   
            $http.get('/score').
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
            var res = $http.post('/score', dataObj).
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
        
        $scope.final_score();   
    });
