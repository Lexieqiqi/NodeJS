var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;
var str = "";
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var ejs = require("ejs");
var dataurl = 'mongodb://localhost:27017/bookingrailway';
var visited = []

app.set("view engine", "ejs");


app.get('/',function(req,res){
	res.render('pages/index');
});



app.post('/tickets',urlencodedParser, function(req,res){
	var contents = "No results.";
	var from = req.body.from;
	var to = req.body.to;
	var date = req.body.date;
	console.log(date)

	function Find(){

		MongoClient.connect(dataurl,function(err,db){
			console.log(from)
			var cursor = db.collection('booking').find({From:from,To:to,DATE:date});

			cursor.each(function(err,item){

				if(item!=null){
					console.log("I am here")
					visited.push({From:item.From, To:item.To, DATE:item.DATE, Departure:item.Departure_time});
				}
				console.log(visited);
				db.close();
				return visited
			});

		});
		console.log('Here')
		// console.log(visited)
	    return visited;
	}
		
	if(Find().length != 0){
		console.log(Find())
		return res.render('pages/tickets.ejs',{tickets:Find()});
	}
	else {
		console.log("No results!")
		return res.render('pages/error.ejs',{results:contents})
	}


	//visited.length = 0
	console.log(visited);
	res.end();
			
});


app.listen(7000);
console.log('7000 is the magic port');