var MongoClient = require('mongodb').MongoClient;
var dataurl = 'mongodb://localhost:27017/bookingrailway';
var db;
var visited = [];

function findTickets(from, to, date,buildServer) {
	MongoClient.connect(dataurl,function(err,db){
		var cursor = db.collection('booking').find({From:from,To:to,DATE:date});
		cursor.each(function(err,item){
			if(item!=null){
				visited.push({From:item.From, To:item.To, DATE:item.DATE, Departure:item.Departure_time});
			}
			//console.log(visited);
			db.close();
			buildServer(visited);
		});
	});
}

exports.findTickets = findTickets;