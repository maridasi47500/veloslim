import {DbService} from '../services/db.service';
import { NgModule, OnDestroy, OnInit, Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { ModalController} from '@ionic/angular';  
import { FormGroup, FormBuilder } from "@angular/forms";
import { DynamicChildDepartLoaderDirective } from '../tab1/loaddepart.directive';
import { DynamicChildArriveeLoaderDirective } from '../tab1/loadarrivee.directive';
//import { Http } from '@angular/http';
declare var ol: any;
import { GPSProvider } from '../../../services/GPSProvider';
var L = require('leaflet');
var Routing = require('leaflet-routing-machine');

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AddPage } from '../add/add.page';  

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public http: HttpClient,
              public plt: Platform,public gps: GPSProvider,
              public router: Router,public modalCtrl: ModalController,public formBuilder: FormBuilder,private db: DbService) {}
  trajets:any;
ngOnInit(){
    this.trajets = this.db.getTrajets();
}
}
