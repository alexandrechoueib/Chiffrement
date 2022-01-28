const app = require('./app')
app.enable('trust proxy');

app.use("/client" , (req, res, next) => {
	const client = {
		id : "EJKDO4512D", 
		name : "Alexandre",
		pseudo : "NKDJKD",
		age : 27, 
		message : "Blabla"
	}
	var ip = req.headers['x-real-ip'] || req.connection.remoteAddress;	
	console.log("Data sent to :" + ip);
	res.json(client)
	res.status(200);
	res.end();
});


app.use("/sendMessage:id", function(req,res){
	console.log("ID donnée en parametre " + req.params.id);
});