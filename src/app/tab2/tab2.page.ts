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
import { Trajet } from '../services/trajet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
      constructor(private storage: StorageService,public http: HttpClient,
              public plt: Platform,public gps: GPSProvider,
              private route: ActivatedRoute, 
              public router: Router,public modalCtrl: ModalController,public formBuilder: FormBuilder,private db: DbService) {}

data:any;
pagenb:any;
routing:any;
mymap:any;
trajets$:Observable<Trajet[]> = of([]);
  public _restoservable: any;

  trajets:any;
  precedent(){
      this.storage.prevpage();
  }
  suivant(){
      this.storage.nextpage();
  }
ngOnDestroy(){
    this._restoservable.unsubscribe()
}
  addrouting(lat1:any,lng1:any,lat2:any,lng2:any){
      if (!this.mymap){
          this.mymap = new Map('map').setView([5.16,-52.65], 23);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
      }
if (this.routing){
      this.mymap.removeControl(this.routing); 
  }
  
   if (lat1 && lat2 && lng1 && lng2) {
  this.routing = L.Routing.control({
  waypoints: [
    L.latLng(parseFloat(lat1), parseFloat(lng1)),
    L.latLng(parseFloat(lat2), parseFloat(lng2))
  ],
    serviceUrl: 'http://localhost:5000/route/v1'
}).addTo(this.mymap);

  }
  };
async ngOnInit(){
    this.db.dbState().subscribe((res) => {
    if(res){
     this._restoservable = this.db.trajetsList$.subscribe((res:any) => {
      if(res){
          console.log(res)
        this.trajets$ = of(res);
        //console.log(res,this.trajets$)
      }
      });
      
      ///
      
        console.log("STORAGE??");
    this.storage.getServiceState().subscribe((res) =>{
        if(res){
            this.storage.pagenb$.subscribe((res:any)=>{
                this.pagenb=res;
                this.db.getTrajets(this.pagenb); 
            });
            console.log(res, "RES");
    this.pagenb=this.storage.getitem();
        console.log(res, "RES");
        if (Number(this.pagenb) > 1) {
      this.db.getTrajets(this.pagenb);
        }else{
            console.log("page1")
            this.pagenb=1;
            //this.storage.setitem(1);
         this.db.getTrajets(1);   
    }
        }
    })
      
      ///
    }
    });
  
}
}
