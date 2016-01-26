angular.module('LoginCtrl', []).controller('LoginController', function($scope, $firebaseAuth, $location) {

    $scope.login={};
    var firebaseObj = new Firebase("https://coderx.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);


    $scope.signin = function(){
        var username = $scope.login.username;
        var password = $scope.login.password;

        loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            $scope.errorText = "";

	    $location.path("/build");

        }, function(error) {
            //Failure callback
            $scope.errorText = "The information you entered is incorrect. Please try again.";
        });

    }

});
