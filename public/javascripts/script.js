var scotchApp = angular.module('scotchApp', ['ngRoute' , 'ngAnimate', 'ui.bootstrap', 'ngStorage', 'ui.router']);



	// configure our routes
   scotchApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider

            // route for the home page
            .state('/', {
                url: '/',
                templateUrl : '/pages/page-login.html',
                controller  : 'loginController'
            })

            // route for the welcome page
            .state('welcome', {
                url: '/welcome',
                templateUrl : '/pages/page-welcome.html',
                controller  : 'courseController'
            })

            // route for the about page
            .state('video', {
                url: '/video',
                templateUrl : '/pages/page-video.html',
                controller  : 'courseController'
            })

            // route for the contact page
            .state('assesment', {
                url: '/assesment',
                templateUrl : '/pages/page-asses.html',
                controller  : 'assesmentController'
            })
            // route for the contact page
            .state('add-video/:id', {
                templateUrl : '/pages/page-add-video.html',
                controller  : 'courseController'
            })

             // route for the contact page
            .state('story-time', {
                templateUrl : '/pages/page-story-time.html',
                controller  : 'courseController'
            });
    });


    scotchApp.factory('authInterceptor', function ($rootScope, $q, $window, $localStorage) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.authorization = $localStorage.token;
          }
          return config;
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      };
    });

    scotchApp.config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });


    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });