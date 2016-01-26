
angular.module('BuildCtrl', []).controller('BuildController', function($scope, $http, $location, $firebaseObject) {

    var ref = new Firebase("https://coderx.firebaseio.com");
    var authData = ref.getAuth();

    if (!authData) {
        $location.path("/");
    }

    $scope.user = {};

  $scope.modes = {'C++': 'c_cpp', 'Python': 'python'};
  $scope.user.mode = $scope.modes["C++"];
  $scope.terminal_output = "$ ";
  $scope.buttonDisabled = false;


  // The ui-ace option
  $scope.aceOption = {
    mode: $scope.user.mode.toLowerCase(),
    showGutter: true,
    theme: 'twilight',
    showPrintMargin: false,
    onLoad: function (_ace) {

      // HACK to have the ace instance in the scope...
      $scope.modeChanged = function () {
        _ace.getSession().setMode("ace/mode/" + $scope.user.mode.toLowerCase());
      };

    }
  };


$scope.execute = function() {

  $scope.buttonDisabled = true;

  $http( {
    method : 'Post',
    url : '/execute',
    data : $scope.user
  }).success(function (data, status, headers, config) {
        $scope.terminal_output = "$ "+data.replace(/(?:\r\n|\r|\n)/g, '\n$ ');
        $scope.buttonDisabled = false;
    }).error(function (data, status, headers, config) {
        $scope.terminal_output = "$ "+data.replace(/(?:\r\n|\r|\n)/g, '\n$ ');
        $scope.buttonDisabled = false;
    });

    // $location.path("/");

  return false;
};

$scope.submit = function() {

	$scope.buttonDisabled = true;

	$http( {
		method : 'Post',
		url : '/submit',
		data : $scope.user
	}).success(function (data, status, headers, config) {
        alert(data);
        $scope.buttonDisabled = false;
    }).error(function (data, status, headers, config) {
        alert("Incorrect");
        $scope.buttonDisabled = false;
    });

    // $location.path("/");

	return false;
};

$scope.logout = function() {
    ref.unauth();
    $location.path("login");
};

});
