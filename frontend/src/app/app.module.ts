import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ConnexionComponent } from './connexion/connexion.component';
import { TchatComponent } from './tchat/tchat.component';

const config : SocketIoConfig = { url : '127.0.0.1:1211', options : {}};
@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent, 
    TchatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}


