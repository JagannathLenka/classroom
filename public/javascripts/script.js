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

             .state('logout', {
                url:          '/',
                templateUrl : '/pages/page-login.html',
                controller  : 'loginController',
                onEnter     :  function(Auth, $stateParams) {
                                  Auth.logout(function(){
                                     console.log('Logged Out');
                                  });
                               }
            })


            // route for the welcome page
            .state('welcome', {
                url: '/welcome',
                templateUrl : '/pages/page-welcome.html',
                controller  : 'welcomeController'
            })

            // route for the about page
            .state('video', {
                url: '/video',
                templateUrl : '/pages/page-video.html',
                controller  : 'courseController',
            })

            // route for the contact page
            .state('assesment', {
                url: '/assesment',
                templateUrl : '/pages/page-asses.html',
                controller  : 'assesmentController',
                resolve     : {

                }
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

    //Intercept the authority
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



   scotchApp.factory('Auth', function ($rootScope, $q, $window, $http, $localStorage) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {

           signup: function (data, success, error) {
               $http.post('/users/signup', data).success(success).error(error)
           },
           login: function (data, success, error) {
               $http.post('/users/signin', data).success(success).error(error)
           },
           logout: function (success) {
               tokenClaims = {};
               console.log('here');
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () {
               return getClaimsFromToken();
           }

       };
   });


    //Check if the user is logged in or not
    scotchApp.run(function($rootScope, $state, $localStorage, $location, Auth) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          
           if(! $localStorage.token) {
            if ( toState.templateUrl != '/pages/page-login.html') {
                    event.preventDefault();
                    $state.go('logout');
                } 
           }else{
                if ( toState.templateUrl === '/pages/page-logout.html') {
                    Auth.logout(function() {
                        $rootScope.loggdinUser = null;
                        event.preventDefault();
                        $location.path('/');
                    });
                };    
           }; 
        });
    });


    scotchApp.config(function ($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });


    // create the controller and inject Angular's $scope
    scotchApp.controller('mainController', function($scope, Auth) {
        // create a message to display in our view
        if (Auth.getTokenClaims()) 
        $scope.name =  Auth.getTokenClaims().name;

        $scope.message = 'Everyone come and see how good I look!';
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('welcomeController', function($scope, $rootScope, Auth) {
        if (Auth.getTokenClaims()) 
        $scope.name =  Auth.getTokenClaims().name;
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });