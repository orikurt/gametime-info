var express = require('express');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static('static'));
app.use(favicon(__dirname + '/static/img/favicon.ico'));

app.listen(3000, function(){
	console.log('server is listening');
});