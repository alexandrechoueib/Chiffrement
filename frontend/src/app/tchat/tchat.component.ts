import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Client } from '../Modèle/Client';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.css']
})
export class TchatComponent implements OnInit {

  @Input() messages : Array<string> = [];
  @Input() message : string = "";
  @Input() destinataire : string ="";
  @Input() name : string ="";
  @Input() id : string = "";
  messageService : MessageService;
  client : Client ;
  clients : Array<Client> = [];

  
  ngOnInit(){
    
  }
  
  ngOnDestroy() {
    //this.messageService.deleteClient(this.client);
  }


  constructor(
      private socket : Socket,
      private route : ActivatedRoute){
    this.messageService = new MessageService(socket);
    this.client = new Client();

    this.route.queryParams.subscribe(params => {
      this.client.setAge(params.age);
      this.client.setName(params.username);
    });
    this.findClient();
    this.getReceiveInformation();
    this.getConnected();
    this.getMessage();
  }

  async findClient() : Promise<void> {
    var tmp = new Client();
    await this.messageService.getClient(this.client).then((client : Client) => {
      tmp = client;
    });
    return tmp == null ? this.createClient() : new Promise<void>(resolve => { 
      this.client = tmp;
      resolve() ;}) ; 
  }

  async createClient() : Promise<void> 
  {
    this.messageService.createClient(this.client);
    await this.messageService.getSocketClient(this.client).then(socket => {
      this.client.setSocket(socket);
    });
    this.clients.push(this.client);     
  }


  onSubmit() : void {
    this.kindOfSend();
    this.messages.push(this.message);
    this.message ="";
  }


  /**** SEND FONCTIONS ******/
  kindOfSend() : void {
    if( this.destinataire == "Broadcast" ){
      this.broadcastMessage( this.client.id, this.message);
    }
    else {
      var clientSelect = this.getClientByID(this.destinataire);
      clientSelect == null ? {} : this.sendMessageTo(clientSelect,this.message); 
    }
  }

  sendMessageTo(destinataire : Client, message : string) : void{
    this.messageService.sendMessageTo(this.client,destinataire,message); 
  }

  broadcastMessage(idclient : string ,message : string){
    this.messageService.broadCastMessage(idclient,message);
  }



  /********GETTER ******************/


  async getConnected() : Promise<void> {
    while(true){
      this.socket.emit('NumberClient');
      await new Promise(r => setTimeout(r, 2000));
    }
  }


  async getReceiveInformation() : Promise<void> {
    this.getServerMessage();
    this.getListOfUsers();
  }

  async getServerMessage() : Promise<void> {
    this.socket.on('client' ,(data : any) => {
       if( data.id_envoyeur != this.client.id)
        this.messages.push(data.message);
    });
  }

  async getMessage() :  Promise<void> {
    this.socket.on('sendTo' ,(data: any) => {
        console.log(data);
        this.messages.push(data.message);
    });
  }


  getClientByID(id : string ) : Client   {
    if(this.clients.length < 1){
      return {} as Client;
    }
    let client = this.clients.find(v => v.id == id ) ;
    return client == undefined ? {} as Client : client ;
  }

  getClient() : Client {
    return this.client;
  }




  /******BOOLEAN */
  clientAlreadyExist(client : Client) : boolean{
    for(let i=0; i < this.clients.length ; i++)
    {
      if(this.clients[i].getName() == client.getName() && this.clients[i].getAge() == client.getAge() ){
        return true;
      }
    }
    return false;
  }
  getListOfUsers() : void {
    this.socket.on('clients', (data :any) => {
      for(let i = 0 ; i < data.length ; i++){
        var client = new Client();
        client.setId(data[i].client.id);
        client.setName(data[i].client.name);
        client.setAge(data[i].client.age);
        client.setSocket(data[i].id_socket);

        if(!this.clientAlreadyExist(client)){
          this.clients.push(Object.assign(new Client(), client));
        }  
      }
    });
  }



}
