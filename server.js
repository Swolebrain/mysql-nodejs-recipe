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
var bodyParser = require("body-parser");


//purpose of this is to enable cross domain requests
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
});
app.use(    bodyParser.urlencoded( {extended: true})    );

app.get('/transactions', function(req,res){
	connection.query("SELECT sid, SUM(donation) AS donation FROM transactions"+
                     " GROUP BY sid", function(err, rows){
        if (!err){
            res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(rows));//Important! this is how you actually
                                          //send back a response
        }else{
            console.log("There was an eror in the query");
        }
    });
});

app.post('/transactions/:sid/:donation', function(req, res){
    var sid = req.params.sid;
    var donation = req.params.donation;
    connection.query("INSERT INTO transactions (sid, donation) VALUES"+
                    " ("+sid+", "+donation+")", function(error){
        if (error){
            console.log("DB insertion failed: "+error);
            res.end("DB error");
        }
        else{
            console.log("DB insertion succeeded");
            res.end("Success");
        }
    });
});

app.get('/bygrade/:grade', function(req,res){
    var grade = req.params.grade;
    var queryStr = "SELECT sid, fname, lname, sum_donation, sections.section_id, grade FROM (select sid, sum(donation) AS sum_donation, fname, lname, section_id from transactions NATURAL JOIN students group by sid) AS all_info JOIN sections ON all_info.section_id = sections.section_id ";
    if (grade != "all")
        queryStr += "WHERE grade='"+grade+"'";
    connection.query(queryStr, function(err, rows){
            if (err){
                console.log("Query by grade failed");
                res.end("DB error");
            }
            else{
                console.log("Query by grade succeeded");
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(rows));
            }
    });
});



app.listen(port);
console.log("Server listening on port "+port);

