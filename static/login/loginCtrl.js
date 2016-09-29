myApp.controller('loginCtrl', ['userManager', '$scope', 'close', 'validator', 'done', 'view_mode', 'userData', 'errorMessage', '$timeout',
	function(userManager, $scope, close, validator, done, view_mode, userData, errorMessage, $timeout){

	$scope.user = userData;
	$scope.view_mode = view_mode;
	var defaultMessage = "And start trading Today";

	$scope.uiError = function(el, message){
		$scope.message = message;
		angular.element('.messages').addClass('errorMsg');
		if (el){
			el.addClass('errorDiv');
		}
	};

	var credentialsUiErr = function( errorMessage){
			var el_pass = angular.element('.user-password');
			var el_user = angular.element('.user-username');
			$scope.uiError(el_user, errorMessage);
			$scope.uiError(el_pass, errorMessage);

	};

	$timeout(function(){
		if (errorMessage){
			credentialsUiErr(errorMessage);
		}
		else{
			$scope.message = defaultMessage;
		}		
	});

	var postRquest = function( result ){
		console.log('loginCtrl:: postRquest | result ', result);
		if (result.status === 409){
			var dup_field = result.data.message.split(': ')[2].split('_')[0];
			var divClass = '.user-' + dup_field;
			var el = angular.element(divClass)
			$scope.uiError(el, dup_field + ' already exists');
			return;
		}
		if (result.status === 400){
			credentialsUiErr(result.data.message);
			return;
		}
		done(result.data);
	};

	$scope.clearErrors = function(elementClass){
		var el = angular.element('.' + elementClass);
		if (!el.hasClass('errorDiv')){
			return;
		}
		$scope.message = defaultMessage;
		angular.element('.messages').removeClass('errorMsg');		
		el.removeClass('errorDiv');
	};

	$scope.register = function(){
		console.log('loginCtrl:: register', $scope.user);
		if (!validator.validateUserRegistration($scope.user)){
			return;
		}
		if ($scope.user.password.length < 6){
			var el = angular.element('.user-password');
			$scope.uiError(el, "Password should be at least 6 charachters long");
			return;
		}
		if ($scope.user.password !== $scope.user.confirm){
			var el = angular.element('.user-password');
			$scope.uiError(el, "Passwords don't match :(");
			return;			
		}
		userManager.register($scope.user).then(postRquest);
	};

	$scope.login = function(){
		console.log('loginCtrl:: login', $scope.user);
		if (!validator.validateUserLogin($scope.user)){
			return;
		}
		userManager.login($scope.user).then(postRquest);
	};

	$scope.sendPasswordReset = function(){
		userManager.reset_password($scope.user.email).then(function(response){
			console.log('loginCtrl:: sendPasswordReset response', response);
			$scope.goTo('sentmail');
		});
	};

	$scope.close = close;

	$scope.goTo = function(view_mode){
		if (view_mode === 'recover'){
			$scope.message = 'Send password reset email';
		}
		else if (view_mode === 'sentmail'){
			$scope.message = 'A password reset link has been sent to ' + $scope.user.email;	
		}
		else {
			$scope.message = defaultMessage;	
		}
		$scope.view_mode = view_mode;
	};


}]);






