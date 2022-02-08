import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TchatComponent } from './tchat/tchat.component';

const routes: Routes = [
  {path : 'tchat', component : TchatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
