import { Component, OnInit } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { Settings, UpdateData, WebsocketService } from '../../shared/services/websocket/websocket.service';
import { takeUntil } from 'rxjs/operators';

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

  defaultColDef = {
    flex: 1,
    enableCellChangeFlash: true, 
    resizable: true,
  };


  rowData = Array<UpdateData>();

  priceThreshhold = 1000;

  rowClassRules = {
    'row-red': params => params.data.price < 1000,
    'row-green': params => params.data.price > 1000,
  }

  private gridApi: GridApi;
  private gridColumnsApi;
  private loaded: boolean;

  constructor(
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnsApi = params.columnApi;
    this.loaded = true;
    this.websocketService.getDataSubject().pipe(
      // takeUntil(componentDestroyed(this))x
    ).subscribe(data => {
        this.handleIncomingData(data);
    });
  }

  settingSubmittedHandler(e: Settings): void {
    this.websocketService.submitSettings(e);
  }

  private handleIncomingData(data: Array<UpdateData>): void {
    this.rowData = [...data, ...this.rowData];
    this.gridApi.redrawRows();
  }


}
