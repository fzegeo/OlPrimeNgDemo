import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DialogModule } from 'primeng/components/dialog/dialog';

import { LayerService } from '../services/layer.service';

@Component({
  selector: 'app-attribute-table',
  templateUrl: './attribute-table.component.html',
  styleUrls: ['./attribute-table.component.css']
})


export class AttributeTableComponent implements OnInit {

  selectedFeatures: any[];

  @Input()
  activeAttributeLayerName: string;

  @Input()
  showAttributeTable: boolean;

  @Input()
  layerFeatures: any[];

  @Input()
  colHeaders: string[];

  @Output()
  dialogClose: EventEmitter<any> = new EventEmitter();

  constructor(private layerService: LayerService) {
    this.selectedFeatures = [];
  }

  ngOnInit() {
  }

  changeStyle(event: any, state: boolean): void {
    event.data._feature.set('selected', state);
  }

  handleSelectRow(event: any):void {
      console.log("Row select");
      console.log(this.selectedFeatures);
      this.changeStyle(event, true)
  }

  handleUnselectRow(event: any):void {
      this.changeStyle(event, false);
  }

  handleRowClick(event: any): void {
      console.log("Row Click");
      console.log(event);
      console.log(this.selectedFeatures);
  }

  // TODO: better way to keep child and parent in sync?
  changeParentShowState(state: boolean):any {
      this.dialogClose.emit({
        "showAttributeTable": false
      });
  }

  resetAttributes(state: boolean):void {
      this.selectedFeatures.forEach((feature) => {
        console.log(feature);
      });
  }

}
