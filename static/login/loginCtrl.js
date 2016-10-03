var clear = function(msg){
	$('.messages').html(msg).removeClass('errorMsg');
	$('.user-username, .user-password, .user-email').removeClass('error');
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
	console.error('register:: error', err);
	if (err.code === 404){
		$('.user-username, .user-password').addClass('error');
		$('.messages').html('Incorrect credentials').addClass('errorMsg');		
	}
};

var onSent = function(success){
	console.log('resetPassword:: success', success);
	$('#sent').modal();
};

var onSentError = function(error){
	console.error('resetPassword:: ERROR', error);
	$('.user-email').addClass('error');
	$('.messages').html('An error occured while trying to send the reset link </br>If this problem persists please contact support <a href="mailto:info@gametimemarket.com">info@gametimemarket.com</a>').addClass('errorMsg');			

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

	$('.forgot-form').on('submit', function(e){
		console.log('forgot-form:: submit', $('.forgot-form').serialize());
		e.preventDefault();		
		$.ajax({
			method: 'GET',
			url: 'https://' + window.location.hostname + '/sendresetpassword',
			data: $('.forgot-form').serialize(),
			success: onSent,
			error: onSentError
		});		
	});

	$('.login-form input').on('keydown', function(){
		clear('And Start Trading Today');
	});
	$('.forgot-form input').on('keydown', function(){
		clear('Send a password reset link to your email');
	});
});