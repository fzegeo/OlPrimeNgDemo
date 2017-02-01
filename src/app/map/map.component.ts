import { Component, OnInit } from '@angular/core';


import { MapService } from '../services/map.service';



@Component({
  selector: 'nlc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    let map = this.mapService.getMap();
    map.setTarget('map');
  }
  
}
