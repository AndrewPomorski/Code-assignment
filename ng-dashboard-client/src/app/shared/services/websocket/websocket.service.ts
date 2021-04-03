import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {
    this.initWebsocketConnection();
  }

  private dataUpdateSubject = new Subject<Array<UpdateData>>();

  private initWebsocketConnection(): void {
    const ws = new WebSocket('ws://localhost:8888/wss');
    ws.onmessage = msg => {
      this.dataUpdateSubject.next(JSON.parse(msg.data));
    };
  }

  getDataSubject(): Subject<Array<UpdateData>> {
    return this.dataUpdateSubject;
  }



}


export interface UpdateData {
  symbol: string,
  price: number,
}