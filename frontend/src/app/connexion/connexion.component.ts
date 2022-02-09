import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Client } from '../Modèle/Client';
import { Socket } from 'ngx-socket-io';
import { RouterModule, Router } from '@angular/router';
import { TchatComponent } from '../tchat/tchat.component';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  @Input() username : string ="";
  @Input() age : number = 18;

  constructor(private router : Router) { }


  Connect() : void {    
    this.router.navigate(['/tchat'], { queryParams : { username : this.username ,  age : this.age}});
  }

  ngOnInit(): void {
  }

}
