angular.module('ResetCtrl', []).controller('ResetController', function($scope, $firebaseAuth, $location) {

    $scope.login={};
    var firebaseObj = new Firebase("https://coderx.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);

    $scope.errorText = "";
    $scope.reset = function(email) {
        firebaseObj.resetPassword({
            email : $scope.login.username
          }, function(error) {
          if (!error || error == "") {
            $scope.errorText = "Password reset email sent successfully";
          } else {
            $scope.errorText = "Error sending password reset email";
            console.log("Error sending password reset email:", error);
          }
        });
        $scope.errorText = "Password reset email sent successfully";
    }


});
