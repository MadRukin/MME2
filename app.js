/**
* app.js - creates a web-server with different url's & setup's
* @author Florian Kruellke
*/
"use strict";
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var reader = require ("read-file");
var app = express();
// add and configure url: "/"
app.get('/', function (req, res) {
	res.send('<!DOCTYPE html>' +
		'<html lang="en">' +
		'<head><meta charset="utf-8"><style>body{font-family: Verdana, sans-serif}</style></head>' +
		'<body><h1>MME2 - Übung 2</h1>' +
		'<a href="/videos">Videos (static)</a><br>' +
		'<a href="/time">Time (text/plain)</a><br>' +
		'<a href="/file.txt">File (output + nanoseconds)</a><br>' +
		'</body></html>'
		);
	});
// add route to static files
app.use('/videos', express.static(path.join(__dirname, 'public')));
// add text/plain output for url: "/time"
app.use('/time', bodyParser.text({type: 'text/plain'}), function(req, res) {
	var text = new Date();
	var t = text.getTime();
	res.send('' + t);
});
// add a file output and display reading time 
app.get('/file.txt', function (req, res) {
	// time before
	var time = process.hrtime();
	// read .txt-file
	var txt = String(reader.sync('file.txt'));
	// time after
	time = process.hrtime()[1] - time[1];
	res.send('<!DOCTYPE html>' +
		'<html lang="en">' +
		'<head><meta charset="utf-8"><style>body{font-family: Verdana, sans-serif}</style></head>' +
		'<body><h1>MME2 - Übung 2</h1>' +
		'<h4>Fileausgabe:</h4><p><i>' + txt.replace('\n', '<br>') + 
		'</i></p>' +
		'<h4>Benötigte Zeit:</h4><p>' + time + ' Nanosekunden</p>' +
		'</body></html>'
		);
	});
// start server
var server = app.listen(3000, function () {
	console.log('app.js is ready and listening at http://localhost:3000');
});
