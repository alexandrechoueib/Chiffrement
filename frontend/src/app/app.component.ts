import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { Client } from './Modèle/Client';
import { Socket } from 'ngx-socket-io';
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

  //variables test des resultats des fonctions
  publicKey = new PublicKey();
  privateKey = new PrivateKey();

  constructor(
      private client : Client,
      private socket : Socket,
  ){
    this.messageService = new MessageService(socket);
    //this.messageService.createClient(this.client);
    this.keyService = new KeyService();
    
    
    /**** Test partie cryptage et decryptage ****/
    /*
    

    this.getServerData();
    
    this.keyService.createPublicKey(10).then(pk => {
      //console.log(pk);
    })
    this.publicKey.setN(BigInt(5141));
    this.publicKey.setE(BigInt(7));
    this.publicKey.setM(BigInt(4992));

    this.privateKey = this.keyService.createPrivateKey(this.publicKey);
    //console.log(this.privateKey)

    this.messageService.messageEncryption("Bonjour !",BigInt(7),BigInt(5141));

    let msg = [BigInt(386),BigInt(737),BigInt(970),BigInt(204),BigInt(1858)]

    this.messageService.messageDecrypting(msg,BigInt(4279),BigInt(5141));*/
  }

  getServerData() : void {
    this.socket.on('client' ,(data : any) => {
      if(data.id_envoyeur != this.client.id)
        this.messages.push(data.message);
    });
  }
  


  ngOnInit(){
    
  }



}
