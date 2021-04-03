import { Component, OnInit } from '@angular/core';

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


  rowData = [
    { symbol: 'AAAA', price: 200 }
  ]

  constructor() { }

  ngOnInit(): void {
  }




}
