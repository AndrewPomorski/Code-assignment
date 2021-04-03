import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from './services/websocket/websocket.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    WebsocketService,
  ]
})
export class SharedModule { }
