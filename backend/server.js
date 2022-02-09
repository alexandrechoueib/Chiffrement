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

	const safeJoin = currentId => {
		socket.leave(previousId);
		socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
		previousId = currentId;
	};


	const getSocketClient = (client) => {
		for(let i=0; i < clients.length ; i++){
			let Loopclient = clients[i].client;
			if(Loopclient.name == client.name && Loopclient.age == client.age ) return clients[i].id_socket;
		}
		return null;
	}

	const alreadyExist = client => {
		for(let i=0; i < clients.length ; i++){
			let Loopclient = clients[i].client;
			if(Loopclient.name == client.name && Loopclient.age == client.age ) return true;
		}

		return false;
	};

	socket.on('NumberClient', client => {
		//console.log("Socket id :" + socket.id);
		socket.emit("clients", clients);
	});


	socket.on('registClient', client => {

		if(alreadyExist(client)){
			console.log("Client déja enregistré !!");
		}
		else{
			clients.push({
				'id_socket' : socket.id,
				'client' :client
			});
			console.log("Client registred :" + client.id );
			console.log("Nombre Client :" + clients.length );
		}	
	});


	socket.on('getSocket', client => {
		var socketemp;
		for(let i=0; i < clients.length ; i++){
			let Loopclient = clients[i].client;
			if(Loopclient.name == client.name && Loopclient.age == client.age ) socketemp = clients[i].id_socket;
		}
		socket.emit('socket_id', socketemp);
	})

	socket.on('getClient' , client => {
		safeJoin(client.id);
		var clientSend ;
		for(let i=0; i < clients.length ; i++){
			let Loopclient = clients[i].client;
			if(Loopclient.name == client.name && Loopclient.age == client.age ) clientSend = Loopclient;
		}

		socket.emit("GetClient" , clientSend);
	});


	socket.on('broadcastMessage' , data => {
		console.log("Broadcast message : " + data.message + "from : " + data.id_envoyeur);
		io.emit("client" , data );
	});

	socket.on('sendMessageTo', (destinataire) =>{
		
		for(let i=0; i < clients.length ; i++){
			let Loopclient = clients[i].client;
			let id_socket = clients[i].id_socket;
			console.log("Name :" + Loopclient.name + "socket id : "+ id_socket)
		}
		
		io.to(destinataire.id_socket).emit("sendTo" , destinataire.message);
	    console.log("Envoie du message :" + destinataire.message + " nom :" + destinataire.name + " socket :" + destinataire.id_socket);

	});

	socket.on('onEditMessage', (data) =>{
		console.log("Je dois modifier le message d'un client");
		//socket.to(data.id).emit("client" , Object.keys(data));
		console.log(`Socket ${socket.id} has connected`);
	});

	socket.on('disconnect', (socket)=> {

		for(let i=0; i < clients.length ; i++){
			console.log(socket.id);
			let Loop_id_Socket = clients[i].id_socket;
			console.log(Loop_id_Socket)
			if(socket.id == Loop_id_Socket ){
				clients.slice(i,1);
				console.log("client supr" + clients.length );
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