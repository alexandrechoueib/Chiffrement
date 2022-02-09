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


	const getSocketClient = (client) => {
		for(let i=0; i < clients.length ; i++){
			if(clients[i].name == client.name && clients[i].age == client.age ) return clients[i].socket;
		}
		return null;
	}

	const alreadyExist = client => {
		for(let i=0; i < clients.length ; i++){
			if(clients[i].name == client.name && clients[i].age == client.age ) return true;
		}

		return false;
	};

	socket.on('NumberClient', client => {
		socket.emit("clients", clients);
	});


	socket.on('registClient', client => {

		if(alreadyExist(client)){
			console.log("Client déja enregistré !!");
		}
		else{
			client.socket = socket.id;
			clients.push(client);
			console.log("Client registred :" + client.id );
			console.log("Nombre Client :" + clients.length );
		}	
	});


	socket.on('getSocket', client => {
		var socketemp;
		for(let i=0; i < clients.length ; i++){
			if(clients[i].name == client.name && clients[i].age == client.age ) {
				socketemp = clients[i].socket;
			}
		}
		socket.emit('socket_id', socketemp);
		
	})

	socket.on('getClient' , client => {
		var clientSend ;
		for(let i=0; i < clients.length ; i++){
			if(clients[i].name == client.name && clients[i].age == client.age ) clientSend = clients[i];
		}

		socket.emit("GetClient" , clientSend);
	});


	socket.on('broadcastMessage' , data => {
		console.log("Broadcast message : " + data.message + "from : " + data.id_envoyeur);
		io.emit("client" , data );
	});

	socket.on('sendMessageTo', (data) =>{
				
		io.to(data.id_socket).emit("sendTo" , {
			'envoyeur' : data.envoyeur,
			'message' : data.message });
	    console.log("Envoie du message :" + data.message + "to  :" + data.name + " socket :" + data.id_socket + " from :" + data.envoyeur.name);

	});

	

	socket.on('disconnect', (socket)=> {
		
		for(let i=0; i < clients.length ; i++){
			if(socket.id == clients[i].socket ){
				console.log('user disconnected :' + clients[i].name);
				clients.slice(i,1);
				console.log("client supr" + clients.length );
			}
		}
		console.log('user disconnected :');
		console.log("Nombre Client :" + clients.length );
	});
});



server.on('listening', () => {
	const adress = server.address();
	const bind = typeof adress === 'string' ? 'pipe '+adress : 'port: ' + port;
	console.log('listening on ' + bind);
});

server.listen(port);