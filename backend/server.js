require('./routes');

const http = require('http');
const app = require('./app');

const port = 1211;
clients = [];


app.set('port' , port);
const server = http.createServer(app);
const io = require('socket.io')(server,{
	cors : {
		origin : ['http://localhost:4200'],
	}
});
io.on('connection',(socket) => {
	let previousId;
	console.log("Une connection a été crée");
	const safeJoin = currentId => {
		socket.leave(previousId);
		socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
		previousId = currentId;
	};

	socket.on('registClient', client => {
		if(clients.includes(client.name) ){
			console.log("Client déja enregistré !!");
		}

		clients.push(client);
		console.log("Client registred :" + client.id );
		console.log("Nombre Client :" + clients.length );
	});

	socket.on('getClient' , id_client => {
		safeJoin(id_client);
		socket.emit("client" , clients[id_client]);
	});


	socket.on('broadcastMessage' , data => {
		console.log("Broadcast message : " + data.message + "from : " + data.id_envoyeur);
		io.emit("client" , data );
	});

	socket.on('sendMessageTo', (data) =>{
		socket.to(data.id_destinataire).emit("client" , Object.keys(data));
		console.log(data.id_envoyeur +" envoie un message à " + data.id_destinataire)
	});

	socket.on('onEditMessage', (data) =>{
		console.log("Je dois modifier le message d'un client");
		socket.to(data.id).emit("client" , Object.keys(data));
		console.log(`Socket ${socket.id} has connected`);
	});

	socket.on('disconnect', (client)=> {
		for(let i = 0 ; i < clients.length ; i++){
			if(clients[i].id == client.id){
				clients.remove(i);
			}
		}
		console.log('user disconnected ');
		console.log("Nombre Client :" + clients.length );
	});
});



server.on('listening', () => {
	const adress = server.address();
	const bind = typeof adress === 'string' ? 'pipe '+adress : 'port: ' + port;
	console.log('listening on ' + bind);
});

server.listen(port);


