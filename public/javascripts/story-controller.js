scotchApp.controller('storyController', function($scope, $rootScope, $http, $localStorage, $location, Auth) {

$scope.play = function() {
	console.log('playing');
var msg = new SpeechSynthesisUtterance('Hellow World');
window.speechSynthesis.speak(msg);
}


});