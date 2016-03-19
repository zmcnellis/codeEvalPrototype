angular.module('ChangeCtrl', []).controller('ChangeController', function($scope, $firebaseAuth, $location) {

    $scope.login={};
    var firebaseObj = new Firebase("https://coderx.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);

    $scope.errorText = "";

  $scope.change = function() {

    firebaseObj.changePassword({
      email       : $scope.login.username,
      oldPassword : $scope.login.password,
      newPassword : $scope.login.passwordNew
    }, function(error) {
      if (error === null) {
        console.log("Password changed successfully");
      } else {
        console.log("Error changing password:", error);
      }
    });
    $scope.errorText = "Password changed successfully";

  }


});
