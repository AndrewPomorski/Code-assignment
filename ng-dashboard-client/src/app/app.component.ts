import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-dashboard-client';

  columnDefs = [
    { headerName: 'Symbol', field: 'symbol' },
    { headerName: 'Price', field: 'price' }, 
  ];


  rowData = [
    { symbol: 'AAAA', price: 200 }
  ]

}
