angular.module('SignupCtrl', []).controller('SignupController', function($scope, $firebaseAuth, $location) {

    $scope.login={};
    var firebaseObj = new Firebase("https://coderx.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);


    $scope.signup = function(){
        var username = $scope.login.username;
        var password = $scope.login.password;

        loginObj.$createUser({
            email: username,
            password: password
        })
        .then(function() {
            //Success callback
            $scope.errorText = "";
	    $scope.signin();

        }, function(error) {
            //Failure callback
            $scope.errorText = "The information you entered is invalid. Please try again.";
        });

    }

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
            firebaseObj.once('value', function(snapshot) {
                if (snapshot.child("users").hasChild(user.uid)) {
                    console.log("user already set up");
                }
                else {
                    firebaseObj.child("users").child(user.uid).set({
                        mccabe0: -1,
                        mccabe1: -1,
                        mccabe2: -1,
                        mccabe3: -1,
                        mccabe4: -1,
                        mccabe5: -1,
                        halstead0: -1,
                        halstead1: -1,
                        halstead2: -1,
                        halstead3: -1,
                        halstead4: -1,
                        halstead5: -1
                    });
                }
            });

	    $location.path("/build");

        }, function(error) {
            //Failure callback
            $scope.errorText = "Authentication failure. Please try again.";
        });

    }

});
