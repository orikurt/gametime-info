var clear = function(){
	$('.messages').html('start trading Today').removeClass('errorMsg');
	$('#password, #confirm, .user-username, .user-email').removeClass('error');
};

var onSuccess = function(data, status, xhr){
	console.log('register:: success', data);
	window.location.replace(conf.app.protocol + '://' + conf.app.host);
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
	if (err.code === 11000){
		var dup_key = err.message.split(': ')[2].split('_')[0];
		$('.user-' + dup_key).addClass('error');
		$('.messages').html(dup_key + ' already exists').addClass('errorMsg');		
	}
};

$(document).ready(function(){
	console.log('loginCtrl:: ready');
	
	$('.register-form').on('submit', function(e){
		console.log('register-form:: submit', $('.register-form').serialize());
		e.preventDefault();
		if ($('#password').val() !== $('#confirm').val() ){
			console.log('passwords do not match!');
			$('#password, #confirm').addClass('error');
			$('.messages').html('Passwords do not match :(').addClass('errorMsg');
			return;
		}
		$.ajax({
			method: 'POST',
			url: 'https://' + window.location.hostname + '/register',
			data: $('.register-form').serialize(),
			xhrFields: { withCredentials: true },
			success: onSuccess,
			error: onError
		});
	});

	$('.register-form input').on('keydown', clear);
});