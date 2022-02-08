import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { Client } from './Modèle/Client';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {

 constructor(){
 }

}
