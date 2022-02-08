import { Injectable , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../Modèle/Client';
import { Socket } from 'ngx-socket-io';
import * as bigintCryptoUtils from 'bigint-crypto-utils'


@Injectable({
  providedIn : 'root'
})
export class MessageService {
  baseUrl : string = "http://127.0.0.1:1211";

  constructor(
    private socket : Socket,
  ){
  }

  etablishConnection() : void {
   this.socket.connect();
  }

  createClient(client : Client) :void{
    this.socket.emit('registClient', client);
  }


  sendMessageTo(destinataire : Client , message : String ): void {
    this.socket.emit('sendMessageTo', {
      'id_socket' : destinataire.getSocket(),
      'name' : destinataire.getName(),
      'message' : message
    })
  }

  broadCastMessage(idclient : string, message : string ) : void {
    this.socket.emit('broadcastMessage' ,{
      "id_envoyeur" : idclient,
      "message":  message
    });
  }

 
  getClient(id : string): Client {
   return this.socket.emit('getClient', id);
  }
  
  public messageEncryption(message : string, e : bigint, n : bigint) : bigint[]{

    //transformation de chaque caractère du message par son code ASCII
    //et son affectation a un tableau resultant 

    let listAscii : bigint[] = [];
    let messageEncoding : bigint[] = [];

    for(let i = 0; i < message.length;i++){
      listAscii[i] = BigInt(message.charCodeAt(i));
    }
    //console.log(listAscii);

    //chiffrement du message
    for(let i = 0; i < listAscii.length; i++){
      messageEncoding[i] = bigintCryptoUtils.modPow(listAscii[i],e,n);
    }

    //console.log("message chiffrement: " + messageEncoding);

    return messageEncoding;
  }

  public messageDecrypting(messageEncoded : bigint[], u : bigint, n : bigint) : string{

    let listAscii : bigint[] = [];
    let messageDecrypted : string = "";

    //transformation de chaque caractère chiffré du message en son code ascii 
    //en appliquant la fonction inverse de l'encodage

    for(let b = 0 ; b < messageEncoded.length; b++){
      listAscii.push(bigintCryptoUtils.modPow(messageEncoded[b],u,n));
    }
    //console.log(listAscii)

    //recuperation des caractères a partir des codes ascii
   
    for(let i = 0; i < listAscii.length; i++){
     messageDecrypted += String.fromCharCode(Number.parseInt(listAscii[i].toString()));
     
    }

    //console.log("message decrypted" + messageDecrypted);

    return messageDecrypted;
  }


  ngOnInit(){

  }


}
