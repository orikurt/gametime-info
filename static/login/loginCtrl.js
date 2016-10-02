var clear = function(){
	$('.messages').html('And Start Trading').removeClass('errorMsg');
	$('.user-username, .user-password').removeClass('error');
};

var onSuccess = function(data, status, xhr){
	console.log('login:: success', data);
	window.location.href = conf.app.protocol + '://' + conf.app.host;
	/*
	$.ajax({
		method: 'GET',
		url: 'https://' + window.location.hostname + '/login',
		xhrFields: { withCredentials: true },
		success: console.log
	});
	*/
};

var onError = function(err){
	err = JSON.parse(err.responseText);
	console.log('register:: error', err);
	if (err.code === 404){
		$('.user-username, .user-password').addClass('error');
		$('.messages').html('Incorrect credentials').addClass('errorMsg');		
	}
};

$(document).ready(function(){
	console.log('loginCtrl:: ready');
	
	$('.login-form').on('submit', function(e){
		console.log('login-form:: submit', $('.login-form').serialize());
		e.preventDefault();
		$.ajax({
			method: 'POST',
			url: 'https://' + window.location.hostname + '/login',
			data: $('.login-form').serialize(),
			xhrFields: { withCredentials: true },
			success: onSuccess,
			error: onError
		});
	});

	$('.login-form input').on('keydown', clear);
});