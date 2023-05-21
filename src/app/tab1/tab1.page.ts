import { NgModule, OnDestroy, OnInit, Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { ModalController} from '@ionic/angular';  
import { FormGroup, FormBuilder } from "@angular/forms";
import { DynamicChildDepartLoaderDirective } from './loaddepart.directive';
import { DynamicChildArriveeLoaderDirective } from './loadarrivee.directive';
//import { Http } from '@angular/http';
declare var ol: any;
import { GPSProvider } from '../../../services/GPSProvider';
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
              public plt: Platform,public gps: GPSProvider,
              public router: Router,public modalCtrl: ModalController,public formBuilder: FormBuilder) {}
                     @ViewChild(DynamicChildDepartLoaderDirective, { static: true }) dynamicChildDepart!: DynamicChildDepartLoaderDirective;
                     @ViewChild(DynamicChildArriveeLoaderDirective, { static: true }) dynamicChildArrivee!: DynamicChildArriveeLoaderDirective;
@ViewChild('departchamp', { read: ElementRef })
public departchamp:any;
@ViewChild('arriveechamp', { read: ElementRef })
public arriveechamp:any;
        Data: any[] = [];

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
        address1:this.address1,
        address2:this.address2,
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
address1:any;
address2:any;
routing:any;
trajetbutton:any;
depart(){
    this.lat2=null;
}
arrivee(){
    this.lat2=1;
}
changedepart(){
    var x = this.gps.getAddress1(this.dynamicChildDepart.viewContainerRef.element.nativeElement.value);  
      var xx =this.gps.getAddress1reverse(this.lat1, this.lng1);
    console.log(x);
    this.addrouting(); 
}
changearrivee(){
    var x = this.gps.getAddress2(this.dynamicChildArrivee.viewContainerRef.element.nativeElement.value); 
      var xx =this.gps.getAddress2reverse(this.lat2, this.lng2);
    console.log(x);
    this.addrouting();
}
  addrouting(){
if (this.routing){
      this.mymap.removeControl(this.routing); 
  }
   if (this.lat1 && this.lat2 && this.lng1 && this.lng2) {
       this.trajetbutton=true;
  this.routing = L.Routing.control({
  waypoints: [
    L.latLng(parseFloat(this.lat1), parseFloat(this.lng1)),
    L.latLng(parseFloat(this.lat2), parseFloat(this.lng2))
  ],
    serviceUrl: 'http://localhost:5000/route/v1'
}).addTo(this.mymap);
  }
  }
       mainForm:any;
        ngOnInit(){
           console.log("ok after init laoded")
            this.gps.getaddress1$.subscribe((mydata:any) =>{
                console.log("funcloads12221")
            this.address1 = mydata.display_name;
            console.log(this.address1,mydata);
          this.dynamicChildDepart.viewContainerRef.element.nativeElement.value = this.address1;
            this.mainForm.setValue({
    address1: (this.address1||''),
    address2: (this.address2||'')
  })
      });
           this.gps.getaddress2$.subscribe((mydata:any) =>{
this.address2 = mydata.display_name;
          this.dynamicChildArrivee.viewContainerRef.element.nativeElement.value = this.address2;
          console.log("funcloads11")
          console.log(this.address2,mydata);
      this.mainForm.setValue({
    address1: (this.address1||''),
    address2: (this.address2||'')
  })      });
       
 
  this.mainForm = this.formBuilder.group({
    address1: [''],
    address2: ['']
  })
      this.gps.address1$.subscribe((mydata:any) =>{
          this.lat1=mydata.lat;
          this.lng1=mydata.lon;
      });
           this.gps.address2$.subscribe((mydata:any) =>{
          this.lat2=mydata.lat;
          this.lng2=mydata.lon;
      });
       
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
  
  var xx =this.gps.getAddress2reverse(this.lat2, this.lng2);
  console.log("oko routing latitudfe 2",this.lat2, this.lng2)
  this.addrouting();

this.trajetbutton=true;
//console.log(this.mapelement._element.nativeElement.outerText)
  }else{
  if (this.routing){
      this.mymap.removeControl(this.routing); 
  }

      this.lat1=args.latlng.lat;
  this.lng1=args.latlng.lng;
      var x = this.gps.getAddress1reverse(this.lat1, this.lng1);
      this.addrouting();
  }
  
});
  }
  savetrajet(){
      console.log(<HTMLElement>this.routing._container.outerText);
      this.trajet=<HTMLElement>this.routing._container.outerText;
      this.showModal();
  }

}
