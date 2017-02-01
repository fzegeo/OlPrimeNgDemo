import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DialogModule } from 'primeng/components/dialog/dialog';

import { LayerService } from '../services/layer.service';
import { StyleService } from '../services/style.service';

@Component({
  selector: 'app-style-editor',
  templateUrl: './style-editor.component.html',
  styleUrls: ['./style-editor.component.css']
})
export class StyleEditorComponent implements OnInit {

  //styleService: any;
  @Input()
  showStyleEditor: boolean;

  @Input()
  activeStyleLayerName: string;

  @Output()
  dialogClose: EventEmitter<any> = new EventEmitter();



  color: string;
  size: number;
  opacity: number;



  constructor(
      private layerService: LayerService,
      private styleService: StyleService
  ) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
      if (changes.activeStyleLayerName) {
          this.activeStyleLayerName = changes.activeStyleLayerName.currentValue;
          let styleInfo = this.collectStyleInfo(this.activeStyleLayerName);
          this.color = styleInfo.color;
          this.opacity = styleInfo.opacity;
          this.size = styleInfo.size;
      }
  }

  sizeChanged(event: any) {
    console.log("SIZE CHANGED");
    console.log(event);
  }

  collectStyleInfo(layerName: string) {
    // TODO: set reasonable default vals
    if (layerName === undefined) {
        return { "color": "#ff00ff", "size": 10, "opacity": 0.7 };
    }

    console.log("COLLECTING STYLE INFO");
    console.log(layerName);
    let style = this.styleService.getDefaultStyle(layerName);
    console.log(style);
    let color = style.getImage().getFill().getColor();
    let hexColor = this.rgbAToHex(color);
    let opacity = Math.round(this.getOpacityFromRgbA(color) * 100);
    let size = style.getImage().getRadius();
    return { "color": hexColor, "opacity": opacity, "size": size };

  }

  handleDialogClose(event: any) {
    console.log("EMITTING EVENT");
    this.dialogClose.emit({
        "showStyleEditor": false
    });
  }

  getOpacityFromRgbA(color: string):number {
    return parseFloat(color.match(/[0-9]\.[0-9]*/)[0]);
  }

  hexToRgbA(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
    }
    throw new Error('Bad Hex');
  }

  // code from: http://jsfiddle.net/Mottie/xcqpF/1/light/
  rgbAToHex(rgb){
      rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
      return (rgb && rgb.length === 4) ? "#" +
          ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
          ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }

  updateStyle(event: any):void {
      let color = this.hexToRgbA(this.color, this.opacity / 100);
      this.styleService.changeDefaultStyle(this.activeStyleLayerName, color, this.size);
      let layer = this.layerService.getLayer(this.activeStyleLayerName);
      layer.getSource().changed();
  }
}
