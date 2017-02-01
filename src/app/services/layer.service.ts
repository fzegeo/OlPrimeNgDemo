import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { StyleService } from './style.service';

declare var ol: any;

@Injectable()
export class LayerService {

  layers: any;

  constructor(
    private configService: ConfigService,
    private styleService: StyleService) {
      // Keep this synced with the node service!!!
      this.layers = {};
      this.configService.getYears().forEach((year) => {
          // TODO.: generate layers via config?!
          this.layers[`academies_${year}`] = this._constructVectorLayer(`academies_${year}`, `assets/geo/academy_${year}.geojson`);
          this.layers[`archives_${year}`] = this._constructVectorLayer(`archives_${year}`, `assets/geo/archive_${year}.geojson`);
          this.layers[`associations_${year}`] = this._constructVectorLayer(`associations_${year}`, `assets/geo/association_${year}.geojson`);
          this.layers[`museums_${year}`] = this._constructVectorLayer(`museums_${year}`, `assets/geo/museum_${year}.geojson`);

          this.layers[`professors_${year}`] = this._constructVectorLayer(`professors_${year}`, `assets/geo/professors_${year}.geojson`);
          this.layers[`historians_${year}`] = this._constructVectorLayer(`historians_${year}`, `assets/geo/historians_${year}.geojson`)
      });
  }

  private _constructVectorSource(path: string) {
      return new ol.source.Vector({
          url: path,
          format: new ol.format.GeoJSON()
      });
  }

  private _constructVectorLayer(name: string, path: string) {
      return new ol.layer.Vector({
          name: name,
          source: this._constructVectorSource(path),
          visible: false,
          style: (feature, resolution) => {
              if (feature.get("selected")) {
                return [this.styleService.getSelectedStyle()]
              } else {
                return [this.styleService.getDefaultStyle(name)]
              }
            }

      })
  }

  getAllLayers():any {
      let layers = [];
      for (let member in this.layers) {
          console.log(member);
          layers.push(this.layers[member]);
      }
      return layers;
  }

  getLayer(layerId: string): any {
      return this.layers[layerId];
  }
}
