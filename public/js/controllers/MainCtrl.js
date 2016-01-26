angular.module('MainCtrl', []).controller('MainController', function($scope, $window, $location, $anchorScroll) {

	$scope.scrollTo = function(id) {
	  $location.hash(id);
	  $anchorScroll();
	}

	$scope.changeColor = function(str) {
		if (str === "option1") {
			document.getElementById("option1Img").src = "images/arrow.svg";
		}
		else if (str === "option2") {
			document.getElementById("option2Img").src = "images/code.svg";
		}
		else if (str === "option3") {
			document.getElementById("option3Img").src = "images/deploy.svg";
		}
		else if (str === "option4") {
			document.getElementById("option4Img").src = "images/maintain.svg";
		}
	}

	$('input[type=radio]').on('change', function () {
		document.getElementById("option1Text").style.fontWeight = "normal";
		document.getElementById("option2Text").style.fontWeight = "normal";
		document.getElementById("option3Text").style.fontWeight = "normal";
		document.getElementById("option4Text").style.fontWeight = "normal";

		document.getElementById("option1Text").style.color = "#000";
		document.getElementById("option2Text").style.color = "#000";
		document.getElementById("option3Text").style.color = "#000";
		document.getElementById("option4Text").style.color = "#000";

		document.getElementById("option1Img").src = "images/arrow_black.svg";
		document.getElementById("option2Img").src = "images/code_black.svg";
		document.getElementById("option3Img").src = "images/deploy_black.svg";
		document.getElementById("option4Img").src = "images/maintain_black.svg";
		if (this.id === 'option1') {
			document.getElementById("radioText").innerHTML = "Whether you are starting from a napkin sketch or rebranding an enterprise we will provide you with the right team to get it done.";
			document.getElementById("option1Text").style.fontWeight = "bolder";
			document.getElementById("option1Text").style.color = "#50B0A0";
			document.getElementById("option1Img").src = "images/arrow.svg";
		}
		else if (this.id === 'option2') {
			document.getElementById("radioText").innerHTML = "Your team is with you from concept to launch and beyond.";
			document.getElementById("option2Text").style.fontWeight = "bolder";
			document.getElementById("option2Text").style.color = "#50B0A0";
			document.getElementById("option2Img").src = "images/code.svg";
		}
		else if (this.id === 'option3') {
			document.getElementById("radioText").innerHTML = "It's alive! This often feels like the first step but we are here when you need us to help monitor and upgrade or just advise.";
			document.getElementById("option3Text").style.fontWeight = "bolder";
			document.getElementById("option3Text").style.color = "#50B0A0";
			document.getElementById("option3Img").src = "images/deploy.svg";
		}
		else if (this.id === 'option4') {
			document.getElementById("radioText").innerHTML = "Maintain ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
			document.getElementById("option4Text").style.fontWeight = "bolder";
			document.getElementById("option4Text").style.color = "#50B0A0";
			document.getElementById("option4Img").src = "images/maintain.svg";
		}
	});
	$scope.tabs = [
	    { title:'Dynamic Title 1', content:'Dynamic content 1' },
	    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
	  ];

	  $scope.alertMe = function() {
	    setTimeout(function() {
	      $window.alert('You\'ve selected the alert tab!');
	    });
	  };
});
