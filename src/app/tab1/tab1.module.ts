import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { HttpModule } from '@angular/http';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AddPage } from '../add/add.page';  
import { GPSProvider } from '../../../services/GPSProvider';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  providers: [GPSProvider],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
