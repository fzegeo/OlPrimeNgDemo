import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';

import { TreeNode } from 'primeng/primeng';

import { NodeService } from '../services/node.service';
import { NodeTemplateService } from '../services/node-template.service';
import { LayerService } from '../services/layer.service';
import { MapService } from '../services/map.service';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'nlc-layer-control',
  templateUrl: './layer-control.component.html',
  styleUrls: ['./layer-control.component.css']
})

export class LayerControlComponent implements OnInit {

  layerTree: TreeNode[];
  selectedLayers: TreeNode[];
  years: string[];
  year: string;
  prevYear: string;
  nodeTemplate: any;

  showStyleEditor: boolean = false;
  showAttributeTable: boolean = false;
  activeStyleLayerName: string;
  activeAttributeLayerName: string;

  attributeTableFeatures: any[] = [];
  // TODO: no hardcoding!
  colHeaders: string[] = [];

  constructor(
      private configService: ConfigService,
      private nodeTemplateService: NodeTemplateService,
      private layerService: LayerService,
      private mapService: MapService
  ) {
      // TODO: Rather use more generic var names
      this.prevYear = "1830";
      this.year = "1830";

      this.layerTree = this.nodeTemplateService.getFunctionTemplate().data;
      this.updateLayerTree(this.layerTree, this.prevYear, this.year);
      this.years = configService.getYears();

  }


  ngOnInit() {
      //this.updateLayerTree(this.layerTree);
  }

  handleEditStyleDialogClosed(event: any) {
    this.showStyleEditor = event.showStyleEditor;
  }

  handleAttributeDialogClosed(event: any) {
    this.showAttributeTable = event.showAttributeTable;
  }

  zoomToExtent(event: any, node: any) {
    event.stopPropagation();
    let layer = this.layerService.getLayer(node.data.layerId);
    let map = this.mapService.getMap();
    map.getView().fit(layer.getSource().getExtent(), map.getSize());
  }

  downloadGeoJson() {
    console.log("TBD");
  }

  editStyle(event: any, node: any) {
    event.stopPropagation();
    this.activeStyleLayerName = node.data.layerId;
    this.showStyleEditor = true;
  }

  showAttributes(event: any, node: any) {
    event.stopPropagation();
    this.activeAttributeLayerName = node.data.layerId;
    let layer = this.layerService.getLayer(this.activeAttributeLayerName);
    let features = layer.getSource().getFeatures();
    // collect the colHeaders
    this.colHeaders = []; 
    let props = features[0].getProperties();
    for (let propMember in props) {
        if (propMember !== "geometry") {
            this.colHeaders.push(propMember);
        }
    }
    features.forEach((feature) => {
      let propsObj = {}
      this.colHeaders.forEach((header) => {
          propsObj[header] = feature.get(header);
      });
      propsObj["_feature"] = feature;
      this.attributeTableFeatures.push(propsObj);
    });
    this.activeAttributeLayerName = node.data.layerId;
    this.showAttributeTable = true;
  }

  // Walk the tree and execute each template function
  updateLayerTree(nodeList: TreeNode[], prevYear: string, currYear: string): void {
      nodeList.forEach((node) => {
        if (node.data) {
            if (node.data.labelTemplate) {
                node.label = node.data.labelTemplate(this.year);
            }
            if (node.data.layerIdTemplate) {
                let currLayerId = node.data.layerIdTemplate(this.year);
                node.data.layerId = currLayerId;
                // TODO: better way to update
                if (node.partialSelected === false) {
                    let prevLayerId = node.data.layerIdTemplate(this.prevYear);
                    this.layerService.getLayer(prevLayerId).setVisible(false);
                    this.layerService.getLayer(currLayerId).setVisible(true);
                }
            }
        }
        if (node.children) {
            this.updateLayerTree(node.children, prevYear, currYear);
        }
      });
  }

  recursiveLayerSwitcher(node: any, selected: boolean):void {
      if (node.children) {
          node.children.forEach((childNode) => {
              this.recursiveLayerSwitcher(childNode, selected);
          });
      } else {
        if (node.data) {
            if (node.data.layerId) {
                this.layerService.getLayer(node.data.layerId).setVisible(selected);
            }
        }
      }
  }

  yearChange(event: any):void {
      this.updateLayerTree(this.layerTree, this.prevYear, this.year);
      this.prevYear = this.year;
  }

  selectNode(event: any):void {
    this.recursiveLayerSwitcher(event.node, true);
  }

  unselectNode(event: any):void {
    this.recursiveLayerSwitcher(event.node, false);
  }

  toggleUiOptions(event: any, node: any) {
    event.stopPropagation();
    node.showUiOptions = !node.showUiOptions;
  }

}
