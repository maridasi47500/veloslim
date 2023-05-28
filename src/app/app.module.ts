import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPageModule } from './add/add.module';
// plugins
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { CacheModule } from "ionic-cache";
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [CacheModule.forRoot(),IonicStorageModule.forRoot(),HttpClientModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,AddPageModule],
  providers: [SQLite,
    SQLitePorter,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
