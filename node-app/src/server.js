var express = require('express');
var app = express();
var fs = require("fs");
var mysql = require('mysql');

require('dotenv').config();

var dbConn = mysql.createConnection({
	host: process.env.MYSQL_DB_HOST,
	user: process.env.MYSQL_DB_USER,
	password: process.env.MYSQL_DB_PASS,
	database: process.env.MYSQL_DB_NAME,
});

dbConn.connect();

dbConn.query('SELECT 1 + 1 AS solution', function (error, results, fields){
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
});

app.get('/', function (req, res) {
	res.send({ message: 'hooray! welcome to our api!' });
});

app.get('/listUsers', function (req, res) {
	fs.readFile(__dirname + "/static/" + "users.json", 'utf8', function (err, data) {
		console.log(data);
		res.send(data);
	});
});

var server = app.listen(3000, function () {
	console.log("Listening at http://%s%s", server.address().address, server.address().port)
});

dbConn.end();

process.on('SIGINT', function(signal){ console.log(`Received ${signal}`); });
process.on('SIGTERM', function(signal){ console.log(`Received ${signal}`); });
