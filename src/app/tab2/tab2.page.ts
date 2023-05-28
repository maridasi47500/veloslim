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
import {PageNumberService} from '../../../services/PageNumberService';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {StorageService} from '../../../services/StorageService'
import { BehaviorSubject, Observable } from 'rxjs';
import { of,Subscription } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
      constructor(private storage: StorageService,public http: HttpClient,
              public plt: Platform,public gps: GPSProvider,
              private route: ActivatedRoute, 
              public router: Router,public modalCtrl: ModalController,public formBuilder: FormBuilder,private db: DbService) {}

data:any;
pagenb:any;
  public _restoservable: Subscription;

  trajets:any;
  precedent(){
  }
  suivant(){
  }

async ngOnInit(){
     this._restoservable = this.db.items$.subscribe((res) => {
      if(res){

      }
      });
    this.pagenb=await this.storage.getitem();
        if (Number(this.pagenb) > 1) {
      this.trajets = this.db.getTrajets(this.pagenb);
        }else{
            this.pagenb=1;
            var x =await this.storage.setitem(1);
         this.trajets = this.db.getTrajets(1);   
    }
}
}
