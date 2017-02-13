import { Injectable } from '@angular/core';


@Injectable()
export class NodeTemplateService {

  nodeTemplate: any;
  constructor() { }

  getFunctionTemplate():any {
      return {
          "data": [
              {
                  "label": "Institutions",
                  "children": [
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Academies (${year})` },
                                    "layerIdTemplate": (year) => { return `academies_${year}` }
                                }
                            },
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Archives (${year})` },
                                    "layerIdTemplate": (year) => { return `archives_${year}` }
                                }
                            },
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Associations (${year})` },
                                    "layerIdTemplate": (year) => { return `associations_${year}` }
                                }
                            },
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Museums (${year})` },
                                    "layerIdTemplate": (year) => { return `museums_${year}` }
                                }
                            }
                  ]
              },
              {
                  "label": "Historians",
                  "children": [
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Professors (${year})` },
                                    "layerIdTemplate": (year) => { return `professors_${year}` }
                                }
                            },
                            {
                                "data": {
                                    "labelTemplate": (year) => { return `Historians (${year})` },
                                    "layerIdTemplate": (year) => { return `historians_${year}` }
                                }
                            }
                  ]
              },
              {
                  "label": "Custom Query",
                  "children": [],
                  "leaf": false
              }

          ]
      };
  }

}
