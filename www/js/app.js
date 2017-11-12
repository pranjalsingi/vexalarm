// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('vexalarm', ['ionic', 'ionic-timepicker'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");
	
	$stateProvider
	  .state('general',{
        url: "/general",
        controller: "GeneralCtlr",
        templateUrl: "templates/general.html"
      })
      .state('home', {
        url: "/home",
		controller : "HomeCtlr",
		templateUrl: "templates/home.html"
      })
      .state('question', {
        url: "/question",
        controller: "QuestionCtlr",
        templateUrl: "templates/question.html"
      });
});

app.service('GlobalService', function(){
	var factory = {}
	factory.name = "";
	factory.number = "";
	factory.alarm = 21600;
	factory.wake = "";
	
	var songObj = document.getElementById('song');
	songObj.src = "https://firebasestorage.googleapis.com/v0/b/vexalarm.appspot.com/o/Gummy%20Bear%20Song%20%5BSHORT%5D.mp3?alt=media&token=e44f0da6-035d-434e-8840-ab20d72c5c8e";
	
	var playSong  = function(){
		songObj.play();
		songObj.loop = true
		beginInterval();
	}
	
	var stopSong = function(){
		songObj.pause();
		$window.clearInterval($scope.interVar);
	}
	
	var vibr = function(){
		navigator.vibrate(1000);
	}
	
	function beginInterval(){
		$scope.interVar = setInterval(vibr, 500);
		console.log("gagaga")
	}
	
	this.getSong = function(){
		return songObj;
	}
	
	this.getName = function(){
		return factory.name;
	}
	
	this.getNumber = function(){
		return factory.number;
	}
	
	this.getAlarm = function(){
		return factory.alarm;
	}
	
	this.getWake = function(){
		return factory.wake;
	}
	
	this.setName = function(v){
		factory.name = v;
	}
	
	this.setNumber = function(v){
		factory.number = v;
	}
	
	this.setAlarm = function(v){
		factory.alarm = v;
	}
	
	this.setWake = function(v){
		factory.wake = v;
	}
});