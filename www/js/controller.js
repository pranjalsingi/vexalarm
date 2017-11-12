var app = angular.module('vexalarm');

app.controller('HomeCtlr', ['$scope','$http', '$state', '$window', 'ionicTimePicker', 'GlobalService', function($scope, $http, $state, $window, ionicTimePicker, GlobalService){
	function preCheck(){
		name = GlobalService.getName();
		number = GlobalService.getNumber();
		console.log(name);
		console.log(number);
		if(name == "" || number == ""){
			$state.go('general');
		}
	}
	preCheck();
	
	$scope.selectedTime = "";
	$scope.choice = "";
	$scope.name = GlobalService.getName();
	
	var timeoutVar;
	var timeInterval;
	
	var checkTime = function(){
		if($scope.selectedTime != ""){
			d = new Date();
			console.log("coming here")
			if($scope.selectedTime.getUTCHours() == d.getHours() && $scope.selectedTime.getUTCMinutes() == d.getMinutes()){
				console.log("wake up man");
				$state.go('question');
			}
		}
	}
	
	var setIntervalCheck = function(){
		checkTime();
		timeInterval = setInterval(checkTime, 60000)
	}
	
	var setEvent = function(){
		temp = new Date().getSeconds();
		temp = 60 - temp;
		timeoutVar = setTimeout(setIntervalCheck, temp*1000);
	}
	
	setEvent();
	
	$scope.choose = function(val){
		GlobalService.setWake(val);
	}
	
	var ipObj1 = {
		callback: function (val) {      //Mandatory
		  if (typeof (val) === 'undefined') {
			console.log('Time not selected');
		  } else {
			$scope.selectedTime = new Date(val * 1000);
			console.log('Selected epoch is : ', val, 'and the time is ', $scope.selectedTime.getUTCHours(), 'H :', $scope.selectedTime.getUTCMinutes(), 'M');
			GlobalService.setAlarm(val*1000);
		  }
		},
		inputTime: GlobalService.getAlarm(),   //Optional
		format: 24,         //Optional
		step: 1,           //Optional
		setLabel: 'Set'    //Optional
	};
	
	$scope.setTime = function(){
 		ionicTimePicker.openTimePicker(ipObj1);
	}
	
}]);

app.controller('QuestionCtlr', ['$scope', '$state', '$http', '$window', 'GlobalService', function($scope, $state, $http, $window, GlobalService){
	$scope.ques = "";
	$scope.obj;
	//$scope.answer = 6;
	
	var songInfo = [
		{
			songName: "Barbie Girl", 
			url: 'https://firebasestorage.googleapis.com/v0/b/vexalarm.appspot.com/o/barbie.mp3?alt=media&token=c84e104e-975c-45cb-a13a-2b4fe42b2390',
			question: "How many times did you hear the word \"barbie\"?",
			answer: 4
		},
		{
			songName: "Who Let The Dogs Out",
			url: 'https://firebasestorage.googleapis.com/v0/b/vexalarm.appspot.com/o/Dogs.mp3?alt=media&token=823d0173-d70a-496b-bbce-022b53e680e3',
			question: "How many times did you hear the phrase \"who let the dogs out\"?",
			answer: 8
		},
		{
			songName: "Friday",
			url: 'https://firebasestorage.googleapis.com/v0/b/vexalarm.appspot.com/o/Friday.mp3?alt=media&token=cf705133-4a28-4d3d-a5b5-b7531598e214',
			question: "How many times did you hear the word \"friday\"?",
			answer: 14
		},
		{
			songName: "Gummy Bear",
			url: 'https://firebasestorage.googleapis.com/v0/b/vexalarm.appspot.com/o/gummyBear.mp3?alt=media&token=79a17e3b-88e0-49cd-8ca0-bdad0b94ae02',
			question: "How many times did you hear the word \"gummy\" ?",
			answer: 18
		}
	];
	
	$scope.wrong = false;
	function numGenerate(start, end){
		num = start + Math.floor((Math.random() * 100) % end);
		return num;
	}

	function typeOperation(){
		choose = ["+", "-", "*"];
		choice = choose[Math.floor(Math.random() * choose.length)];
		return choice;
	}

	function generateProblem(){
		num1 = numGenerate(5,10);
		num2 = numGenerate(5,10);
		num3 = numGenerate(5,10);
		num4 = numGenerate(5,10);

		o1 = typeOperation();
		o2 = typeOperation();
		o3 = typeOperation();
		problem = num1 + o1 + num2 + o2 + num3 + o3 + num4;
		return problem;
	}
	
	function songObject(){
		num = Math.floor((Math.random() * 100) % songInfo.length);
		return songInfo[num];
	}
	
	var wakeChoice = GlobalService.getWake();
	
	if(wakeChoice == 'arith'){
		$scope.ques = generateProblem();
	}
	else if(wakeChoice == 'twilio'){
		$scope.obj = songObject();
		$scope.ques = $scope.obj.question
	}
	
	$scope.check = function(ques, ans){
		if(ans != ""){
			console.log(ans);
			if(Number.parseInt(ans) == eval(ques)){
				$state.go('home');
			}
			else{
				$window.alert("Wrong Answer");
			}
		}
		else{
			$window.alert('Answer is empty');
		}
	}
	
	
}]);

app.controller('GeneralCtlr', ['$scope', '$state', '$http', '$window', 'GlobalService', function($scope, $state, $http, $window, GlobalService){
	$scope.check = function(name, number){
		if(name != "" && name != undefined && Number.isInteger(number)){
			if(number.toString().length == 10){
				GlobalService.setName(name);
				GlobalService.setNumber(number);
				$state.go('home');
			}
			else{
				$window.alert("Check your number");
			}
		}
	}
}]);