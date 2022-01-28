import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { Client } from './Modèle/Client';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  @Input() messages : Array<string> = [];
  @Input() message : string = "";
  @Input() destinataire : string ="Bob";
  @Input() name : string ="";
  @Input() id : string = "";
  messageService : MessageService;


  constructor(
      private client : Client,
      private socket : Socket,
  ){
    this.messageService = new MessageService(socket);
    this.messageService.createClient(this.client);

    this.getServerData();
  }

  getServerData() : void {
    this.socket.on('client' ,(data : any) => {
      if(data.id_envoyeur != this.client.id)
        this.messages.push(data.message);
    });
  }
  
  onSubmit() : void {
    this.messages.push(this.message);
    this.broadcastMessage( this.client.id, this.message);
    this.message ="";
  }

  sendMessageTo(destinataire : string, message : string) : void{
    this.messageService.sendMessageTo(this.client.id,destinataire,message); 
  }

  broadcastMessage(idclient : string ,message : string){
    this.messageService.broadCastMessage(idclient,message);
  }

  getClient() : Client  {
   return this.client;
  }

  ngOnInit(){
    
  }



}
