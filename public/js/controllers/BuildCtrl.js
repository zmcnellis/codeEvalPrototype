
angular.module('BuildCtrl', []).controller('BuildController', function($scope, $http, $location, $firebaseObject, $modal) {

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


  $scope.open = function (metricArg) {
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
              metrics: function () {
              return metricArg;
              },
              topMccabe: function () {
                if ($scope.user.lesson == "Hello World")
                  return 0;
                else
                  return 2;
              },
              topHalstead: function () {
                if ($scope.user.lesson == "Hello World")
                  return 0;
                else
                  return 2;
              }
          }
      });

      modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
      }, function () {
          // $log.info('Modal dismissed at: ' + new Date());
      });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
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
        // alert(data.answer);
        $scope.buttonDisabled = false;
        if (data.answer == "correct") {
          $scope.error = false;
          $scope.open(data.metrics);
        }
        else {
          $scope.error = true;
        }
    }).error(function (data, status, headers, config) {
        $scope.error = true;
        $scope.buttonDisabled = false;
    });

    // $location.path("/");

	return false;
};

$scope.logout = function() {
    ref.unauth();
    $location.path("login");
};

})

.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', '$sce', 'metrics', 'topMccabe', 'topHalstead', function ($scope, $modalInstance, $sce, metrics, topMccabe, topHalstead) {
    $scope.metrics = $sce.trustAsHtml(metrics.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
    $scope.topMccabe = topMccabe;
    $scope.topHalstead = topHalstead;

    $scope.ok = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

