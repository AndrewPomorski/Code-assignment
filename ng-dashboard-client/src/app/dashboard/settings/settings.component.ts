import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Settings } from 'src/app/shared/services/websocket/websocket.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  @Output() settingsSubmitted = new EventEmitter<Settings>();


  elementsPerUpdate  = 50;
  updateFrequency = 300;
  symbols: string;


  ngOnInit(): void {
  }

  updateElementsPerUpdate(e: any): void {
    console.log(e.target.value);
  }

  submitSettingsValues(): void {
    this.settingsSubmitted.emit({
      elementsPerUpdate: this.elementsPerUpdate,
      updateFrequency: this.updateFrequency,
      symbols: this.symbols.split(','),
    });
  }

}
