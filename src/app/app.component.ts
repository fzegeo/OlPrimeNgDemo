import { Component } from '@angular/core';

import { LayerService } from './services/layer.service';
import { MapService } from './services/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OpenLayers Primeng Demo';

  constructor(
      private layerService: LayerService,
      private mapService: MapService
  ) {

  }
  addLayer() {
      let layer = this.layerService.addLayer(200);
      console.log(layer.get("name"));
      this.mapService.addLayer(layer);
      console.log(this.mapService.getMap());
  }
}
