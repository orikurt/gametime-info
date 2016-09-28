var express = require('express');
var favicon = require('serve-favicon');

var app = express();

app.use(express.static('.'));
app.use(favicon(__dirname + '/img/favicon.ico'));

app.listen(3000, function(){
	console.log('server is listening');
});