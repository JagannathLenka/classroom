var scotchApp = angular.module('scotchApp', ['ngRoute']);



	// configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/pages/welcome.html',
                controller  : 'courseController'
            })

            // route for the about page
            .when('/video', {
                templateUrl : '/pages/video.html',
                controller  : 'courseController'
            })

            // route for the contact page
            .when('/assesment', {
                templateUrl : '/pages/asses.html',
                controller  : 'assesmentController'
            });
    });



    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });