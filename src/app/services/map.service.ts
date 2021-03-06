import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { LayerService } from './layer.service';

declare var ol: any;

@Injectable()
export class MapService {
  olmap: any;
  private layerAddSource = new Subject<any>();
  layerAdd$ = this.layerAddSource.asObservable();

  constructor(private layerService: LayerService) {
    let layers = [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ];

    let overlays = this.layerService.getAllLayers();
    overlays.forEach((layer) => {
      layers.push(layer);
    });

    this.olmap = new ol.Map({
        layers: layers,
        view: new ol.View({
          center: ol.proj.fromLonLat([7.41, 48.82]),
          zoom: 4
        })
    });
  }

  addLayer(layer: any):void {
      this.olmap.addLayer(layer);
      this.layerAddSource.next(layer);
  }

  removeLayer(layer: any):void {
      this.olmap.removeLayer(layer);
  }
  
  getMap():any {
    return this.olmap;
  }

}
