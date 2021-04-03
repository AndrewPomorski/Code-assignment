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
  private webSocket: WebSocket;

  private initWebsocketConnection(): void {
    this.webSocket = new WebSocket('ws://localhost:8888/wss');
    this.webSocket.onmessage = msg => {
      this.dataUpdateSubject.next(JSON.parse(msg.data));
    };
  }

  getDataSubject(): Subject<Array<UpdateData>> {
    return this.dataUpdateSubject;
  }

  submitSettings(settings: Settings): void {
    this.webSocket.send(JSON.stringify(settings));
  }



}


export interface UpdateData {
  symbol: string,
  price: number,
}

export interface Settings {
  elementsPerUpdate: number,
  updateFrequency: number,
  symbols: Array<string>,
}