
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


  $scope.open = function (metricArg, mccabe, halstead) {
    ref.once('value', function(snapshot) {
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          resolve: {
              metrics: function () {
                var metric_output = [
                  mccabe,
                  halstead
                ];
                return metric_output;
              },
              topMccabe: function () {
                
                    if (snapshot.child("users").hasChild(authData.uid)) {
                      var currentVal = parseInt(snapshot.child("users").child(authData.uid).child("mccabe"+$scope.user.lesson).val());
                      if (currentVal == -1 || parseInt(mccabe) < currentVal) {
                        var foo = {};
                        var index = "mccabe"+$scope.user.lesson;
                        foo[index] = parseInt(mccabe);
                        ref.child("users").child(authData.uid).update(foo);
                        return parseInt(mccabe);
                      }
                      else {
                        return currentVal;
                      }
                    }
                    else {
                        console.log("Caught Error: cannot find user data");
                        return "ERROR";
                    }

              },
              topHalstead: function () {

                    if (snapshot.child("users").hasChild(authData.uid)) {
                      var currentVal = parseFloat(snapshot.child("users").child(authData.uid).child("halstead"+$scope.user.lesson).val());
                      if (currentVal == -1 || parseFloat(halstead) < currentVal) {
                        var foo = {};
                        var index = "halstead"+$scope.user.lesson;
                        foo[index] = parseFloat(halstead);
                        ref.child("users").child(authData.uid).update(foo);
                        return parseFloat(halstead);
                      }
                      else {
                        return currentVal;
                      }
                    }
                    else {
                        console.log("Caught Error: cannot find user data");
                        return "ERROR";
                    }

              },
              avgMccabe: function () {
                var stats = {};
                if ($scope.user.mode == "python") {
                  if ($scope.user.lesson == 0) {
                    stats["avg"] = 0.0;
                    stats["min"] = 0.0;
                    stats["max"] = 0.0;
                  }
                  else if ($scope.user.lesson == 1) {
                    stats["avg"] = 2.0;
                    stats["min"] = 0.0;
                    stats["max"] = 6.0;
                  }
                  else if ($scope.user.lesson == 2) {
                    stats["avg"] = 2.26;
                    stats["min"] = 1.0;
                    stats["max"] = 6.0;
                  }
                  else if ($scope.user.lesson == 3) {
                    stats["avg"] = 4.3;
                    stats["min"] = 2.0;
                    stats["max"] = 10.0;
                  }
                  else if ($scope.user.lesson == 4) {
                    stats["avg"] = 5.23;
                    stats["min"] = 3.0;
                    stats["max"] = 17.0;
                  }
                  else if ($scope.user.lesson == 5) {
                    stats["avg"] = 5.92;
                    stats["min"] = 1.0;
                    stats["max"] = 20.0;
                }
                else {
                  if ($scope.user.lesson == 0) {
                    stats["avg"] = 0.0;
                    stats["min"] = 0.0;
                    stats["max"] = 0.0;
                  }
                  else if ($scope.user.lesson == 1) {
                    stats["avg"] = 2.21;
                    stats["min"] = 0.0;
                    stats["max"] = 4.0;
                  }
                  else if ($scope.user.lesson == 2) {
                    stats["avg"] = 2.59;
                    stats["min"] = 0.0;
                    stats["max"] = 5.0;
                  }
                  else if ($scope.user.lesson == 3) {
                    stats["avg"] = 6.36;
                    stats["min"] = 2.0;
                    stats["max"] = 11.0;
                  }
                  else if ($scope.user.lesson == 4) {
                    stats["avg"] = 5.68;
                    stats["min"] = 3.0;
                    stats["max"] = 10.0;
                  }
                  else if ($scope.user.lesson == 5) {
                    stats["avg"] = 4.38;
                    stats["min"] = 1.0;
                    stats["max"] = 14.0;
                  }
                }
                return stats;
              },
              avgHalstead: function () {
                var stats = {};
                if ($scope.user.mode == "python") {
                  if ($scope.user.lesson == 0) {
                    stats["avg"] = 0.0;
                    stats["min"] = 0.0;
                    stats["max"] = 0.0;
                  }
                  else if ($scope.user.lesson == 1) {
                    stats["avg"] = 2.65;
                    stats["min"] = 0.5;
                    stats["max"] = 5.67;
                  }
                  else if ($scope.user.lesson == 2) {
                    stats["avg"] = 2.72;
                    stats["min"] = 1.0;
                    stats["max"] = 5.71;
                  }
                  else if ($scope.user.lesson == 3) {
                    stats["avg"] = 4.44;
                    stats["min"] = 1.0;
                    stats["max"] = 8.4;
                  }
                  else if ($scope.user.lesson == 4) {
                    stats["avg"] = 3.49;
                    stats["min"] = 1.0;
                    stats["max"] = 9.15;
                  }
                  else if ($scope.user.lesson == 5) {
                    stats["avg"] = 4.26;
                    stats["min"] = 1.8;
                    stats["max"] = 7.8;
                  }
                }
                else {
                  if ($scope.user.lesson == 0) {
                    stats["avg"] = 0.0;
                    stats["min"] = 0.0;
                    stats["max"] = 0.0;
                  }
                  else if ($scope.user.lesson == 1) {
                    stats["avg"] = 5.57;
                    stats["min"] = 3.0;
                    stats["max"] = 5.0;
                  }
                  else if ($scope.user.lesson == 2) {
                    stats["avg"] = 5.53;
                    stats["min"] = 3.0;
                    stats["max"] = 5.0;
                  }
                  else if ($scope.user.lesson == 3) {
                    stats["avg"] = 9.59;
                    stats["min"] = 3.0;
                    stats["max"] = 5.0;
                  }
                  else if ($scope.user.lesson == 4) {
                    stats["avg"] = 13.03;
                    stats["min"] = 4.0;
                    stats["max"] = 5.0;
                  }
                  else if ($scope.user.lesson == 5) {
                    stats["avg"] = 5.44;
                    stats["min"] = 2.0;
                    stats["max"] = 5.0;
                  }
                }
                return stats;
              }
          }
      });

      modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
      }, function () {
          // $log.info('Modal dismissed at: ' + new Date());
      });
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
          $scope.open(data.metrics, data.mccabe, data.halstead);
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

.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', '$sce', 'metrics', 'topMccabe', 'topHalstead', 'avgMccabe', 'avgHalstead', function ($scope, $modalInstance, $sce, metrics, topMccabe, topHalstead, avgMccabe, avgHalstead) {
    $scope.mccabe = metrics[0];
    $scope.halstead = metrics[1];
    $scope.topMccabe = topMccabe;
    $scope.topHalstead = topHalstead;
    $scope.avgMccabe = avgMccabe["avg"];
    $scope.maxMccabe = avgMccabe["max"];
    $scope.minMccabe = avgMccabe["min"];
    $scope.avgHalstead = avgHalstead["avg"];
    $scope.maxHalstead = avgHalstead["max"];
    $scope.minHalstead = avgHalstead["min"];

    $scope.ok = function () {
        $modalInstance.dismiss('cancel');
    };

}]);

