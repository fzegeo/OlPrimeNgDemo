import { Injectable } from '@angular/core';



declare var ol: any;

@Injectable()
export class StyleService {
  colors: string[] = [];
  defaultStyles: any = {};
  selectedStyle: any;

  constructor(
  ) {
    // Style for selected features
    this.selectedStyle = new ol.style.Style({
      image: new ol.style.Circle({
        fill: new ol.style.Fill({
          color: 'rgba(220, 20, 220, 0.75)'
        }),
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 0.7
        }),
        radius: 9
      })
    })
  }

  createRandomStyle(layerName: string) {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let color = `rgba(${r},${g},${b}, 0.25)`;
    let style = this.constructCircleStyle(color, 8);
    return style;
  }

  changeDefaultStyle(layerName: string, color: string, size: number) {
      this.defaultStyles[layerName] = this.constructCircleStyle(color, size);
  }

  constructCircleStyle(fillColor: string, radius: number):any {
      return new ol.style.Style({
        image: new ol.style.Circle({
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: 'black',
            width: 0.1
          }),
          radius: radius
        })
      });
  }
  
  getDefaultStyle(layerName: string):any {
    if (this.defaultStyles[layerName] === undefined) {
      console.log("Style not yet defined!");
      this.defaultStyles[layerName] = this.createRandomStyle(layerName);
    }
    return this.defaultStyles[layerName];
  }

  getSelectedStyle():any {
    console.log(this.selectedStyle);
    return this.selectedStyle;
  }

}
