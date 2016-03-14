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
            var authData = firebaseObj.getAuth();
            firebaseObj.once('value', function(snapshot) {
                if (snapshot.child("users").hasChild(authData.uid)) {
                    console.log("user already set up");
                }
                else {
                    firebaseObj.child("users").child(authData.uid).set({
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
            $scope.errorText = "The information you entered is incorrect. Please try again.";
        });

    }

});
