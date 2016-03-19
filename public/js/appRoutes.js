angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'MainController'
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'SignupController'
		})

		.when('/reset', {
			templateUrl: 'views/reset.html',
			controller: 'ResetController'
		})

		.when('/changePassword', {
			templateUrl: 'views/changePassword.html',
			controller: 'ChangeController'
		})

		.when('/developers', {
			templateUrl: 'views/developers.html',
			controller: 'DevelopersController'	
		})

		.when('/build', {
			templateUrl: 'views/build.html',
			controller: 'BuildController'	
		});

	$locationProvider.html5Mode(true);

}]);
