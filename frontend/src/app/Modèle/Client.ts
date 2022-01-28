import { Injectable } from "@angular/core";
import { ClientInterface } from "../Interface/ClientInterface";

@Injectable({
    providedIn : 'root'
})
export class Client implements ClientInterface{
    id : string = "1AKOÉ";
    name : string = "Alex";
    age : number = 27;
    messages : Array<string> = [];

    constructor(){
        this.id = this.createID();
    }

    addMessage(message : string) : void {
      this.messages.push(message);
    }


    createID() : string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
        for (let i = 0; i < 10; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
    
        return text;
      } 

}