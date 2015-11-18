/*
*************MySQL Connection stuff******************
*/
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'fundraising_app'
});
connection.connect();

/*
    Express template
*/
var port = 9000;
var express = require('express');
var app = express();

//purpose of this is to enable cross domain requests
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.get('/transactions', function(req,res){
	
});

app.listen(port);
console.log("Server listening on port "+port);

