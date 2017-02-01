// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';


// Third party Modules
import { TreeModule } from 'primeng/components/tree/tree';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { SliderModule } from 'primeng/components/slider/slider';
import { SpinnerModule } from 'primeng/components/spinner/spinner';


// App Modules
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LayerControlComponent } from './layer-control/layer-control.component';
import { AttributeTableComponent } from './attribute-table/attribute-table.component';
import { StyleEditorComponent } from './style-editor/style-editor.component';

// Services
import { ConfigService } from './services/config.service';
import { LayerService } from './services/layer.service';
import { MapService } from './services/map.service';
// TODO: Define one service use templates in seperate section
import { NodeService } from './services/node.service';
import { NodeTemplateService } from './services/node-template.service';
import { StyleService } from './services/style.service';

@NgModule({
  declarations: [
    AppComponent,
    AttributeTableComponent,
    LayerControlComponent,
    MapComponent,
    StyleEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AccordionModule,
    DialogModule,
    DataTableModule,
    SharedModule,
    SliderModule,
    SpinnerModule,
    TreeModule,
    TooltipModule
  ],
  providers: [
      ConfigService,
      LayerService,
      MapService,
      NodeService,
      NodeTemplateService,
      StyleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
