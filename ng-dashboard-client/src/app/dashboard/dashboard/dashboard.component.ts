import { Component, OnInit } from '@angular/core';
import { UpdateData, WebsocketService } from '../../shared/services/websocket/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  columnDefs = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Price', field: 'price' }, 
  ];


  rowData = [];

  constructor(
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.websocketService.getDataSubject().pipe(
    ).subscribe(data =>{
      this.handleIncomingData(data);
    });
  }

  private handleIncomingData(data: Array<UpdateData>): void {
    this.rowData = [...data, ...this.rowData];
  }




}
