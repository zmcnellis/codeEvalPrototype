
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


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function () {
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
              items: function () {
              return $scope.items;
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
          $scope.open();
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

.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

