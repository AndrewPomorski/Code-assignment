import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
