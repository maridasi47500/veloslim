import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpModule } from '@angular/http';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AddPage } from '../add/add.page';  
import { GPSProvider } from '../../../services/GPSProvider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DynamicChildDepartLoaderDirective} from './loaddepart.directive';
import {DynamicChildArriveeLoaderDirective} from './loadarrivee.directive';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  providers: [GPSProvider],
  declarations: [Tab1Page,DynamicChildDepartLoaderDirective,DynamicChildArriveeLoaderDirective]
})
export class Tab1PageModule {}
