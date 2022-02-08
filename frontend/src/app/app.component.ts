import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { Client } from './Modèle/Client';
import { Socket } from 'ngx-socket-io';
import { Key } from './Modèle/Key';
import { PublicKey } from './Modèle/PublicKey';
import { KeyService } from './services/key.service';
import { PrivateKey } from './Modèle/PrivateKey';

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
  keyService : KeyService;

  //test des resultats des fonctions
  publicKey = new PublicKey();
  privateKey = new PrivateKey();

  constructor(
      private client : Client,
      private socket : Socket,
  ){
    this.messageService = new MessageService(socket);
    this.messageService.createClient(this.client);
    this.keyService = new KeyService();

    this.getServerData();
    
    this.keyService.createPublicKey(10).then(pk => {
      console.log(pk);
    })
    this.publicKey.setN(BigInt(5141));
    this.publicKey.setE(BigInt(7));
    this.publicKey.setM(BigInt(4992));

    this.privateKey = this.keyService.createPrivateKey(this.publicKey);
    console.log(this.privateKey)
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
