import { NgModule, OnDestroy, OnInit, Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { ModalController} from '@ionic/angular';  
//import { Http } from '@angular/http';
declare var ol: any;
var L = require('leaflet');
var Routing = require('leaflet-routing-machine');
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AddPage } from '../add/add.page';  
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public http: HttpClient,
              public plt: Platform,
              public router: Router,public modalCtrl: ModalController) {}
              mymap:any;
              trajet:any;
              async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: AddPage,
      componentProps: { 
        foo: 'hello',
        bar: 'world',
        lat1:this.lat1,
        lat2:this.lat2,
        lon1:this.lng1,
        lon2:this.lng2,
        trajet:this.trajet
      }
    });  
    return await modal.present();  
  }  
	       @ViewChild("map") mapelement:any;
addr={};
startPos:any;
userlat:any;
routing2:any;
lat1:any;
lng1:any;
lat2:any;
lng2:any;
routing:any;
trajetbutton:any;
depart(){
    this.lat2=null;
}
arrivee(){
    this.lat2=1;
}

  ngOnInit(){
	   this.mymap = new Map('map').setView([5.16,-52.65], 23);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
    this.mymap.on('click', (args:any) => {
        
  console.log(args.latlng.lat);
  console.log(args.latlng.lng);
  if (this.lat2) {
      this.lat2=args.latlng.lat;
  this.lng2=args.latlng.lng;
  if (this.routing){
      this.mymap.removeControl(this.routing); 
  }
  this.routing = L.Routing.control({
  waypoints: [
    L.latLng(parseFloat(this.lat1), parseFloat(this.lng1)),
    L.latLng(parseFloat(this.lat2), parseFloat(this.lng2))
  ],
    serviceUrl: 'http://localhost:5000/route/v1'
}).addTo(this.mymap);
this.routing2 = L.Routing.control({
  waypoints: [
    L.latLng(parseFloat(this.lat1), parseFloat(this.lng1)),
    L.latLng(parseFloat(this.lat2), parseFloat(this.lng2))
  ],
    serviceUrl: 'http://localhost:5000/route/v1'
});
console.log(this.routing2,<HTMLElement>this.routing._container.attributes);
this.trajetbutton=true;
console.log(this.mapelement._element.nativeElement.outerText)
  }else{
  if (this.routing){
      this.mymap.removeControl(this.routing); 
  }
      this.lat1=args.latlng.lat;
  this.lng1=args.latlng.lng;
  }
  
});
  }
  savetrajet(){
      console.log(<HTMLElement>this.routing._container.outerText);
      this.trajet=<HTMLElement>this.routing._container.outerText;
      this.showModal();
  }

}
