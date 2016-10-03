var express = require('express');
var favicon = require('serve-favicon');
var conf = require('./static/config');

var app = express();

app.use(express.static('static'));
app.use(favicon(__dirname + '/static/img/favicon.ico'));

app.listen(conf.server.port, function(){
	console.log('server is listening');
});