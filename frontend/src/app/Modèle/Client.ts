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
    private socket : string = "";
    private firstConnexion : boolean = true;
    private privateKey : string = "";
    public publicKey : string ="";

    correspondant : Array<Client> = [] 

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

    setName(name : string): void {
      this.name = name;
    }
    getAge() : number {
      return this.age;
    }

    setAge(age : number){
      this.age = age;
    }

    getName(): string{
      return this.name;
    }
    getId() : string {
      return this.id;
    }

    getSocket(): string{
      return this.socket;
    }

    setSocket(socket : string): void{
      this.socket = socket;
    }

    setId(id : string){
      this.id = id;
    }

    getMessages(): Array<string>{
      return this.messages;
    }

    getFirstConnexion() : boolean {
      return this.firstConnexion;
    }

    setFirstConnexion() : void {
      this.firstConnexion = false;
    }
}