export class WebSocketService {
    
    constructor() {
      const socket = new WebSocket('ws://localhost:8888/wss');
      socket.onmessage = (msg) => {
        this.handleDataUpdate(JSON.parse(msg.data));
      }
    }

    private handleDataUpdate(data: Array<UpdateData>): void {
        this.data = [...this.data, ...data];
        console.log(this.data.length);
    }

    private data: Array<UpdateData>  = [];

}

export interface UpdateData {
    symbol: string;
    price: number;
}