angular.module('classroom', ['ui.router', 'ngResource','ngSanitize']).
config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**'
    ]);
}]);
