var scotchApp = angular.module('scotchApp', ['ngRoute' , 'ngAnimate']);



	// configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : '/pages/page-welcome.html',
                controller  : 'courseController'
            })

            // route for the about page
            .when('/video', {
                templateUrl : '/pages/page-video.html',
                controller  : 'courseController'
            })

            // route for the contact page
            .when('/assesment', {
                templateUrl : '/pages/page-asses.html',
                controller  : 'assesmentController'
            })
            // route for the contact page
            .when('/add-video/:id', {
                templateUrl : '/pages/page-add-video.html',
                controller  : 'courseController'
            })

             // route for the contact page
            .when('/story-time', {
                templateUrl : '/pages/page-story-time.html',
                controller  : 'courseController'
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