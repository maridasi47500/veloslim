import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class GPSProvider {
 
  constructor(public http: HttpClient) { }
 
   private  address1:any= new BehaviorSubject([]);
        address1$ = this.address1.asObservable();
   private  address2:any= new BehaviorSubject([]);
        address2$ = this.address2.asObservable();
         private  getaddress1:any= new BehaviorSubject([]);
        getaddress1$ = this.getaddress1.asObservable();
   private  getaddress2:any= new BehaviorSubject([]);
        getaddress2$ = this.getaddress2.asObservable();
   getAddress1(address: any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/?addressdetails=1&format=json&limit=1&q='+address.replace(" ","+")).subscribe(data => {
    var res=JSON.parse(JSON.stringify(data))[0];
        console.log((JSON.stringify(data)),"data1");
        console.log(res.lat,"data1");
            console.log(Object.values(data),"data1");
            this.address1.next(res);
    });
        }
        observer();
        return this.address1$;
  }
     getAddress1reverse(lat: any,lon:any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat=<value1>&lon=<value2>'.replace("<value1>",String(lat)).replace("<value2>",String(lon))).subscribe(data => {
    var res=JSON.parse(JSON.stringify(data));
        console.log((JSON.stringify(data)),"data1 reverse geo");
        console.log(res.lat,"data1reverse geo");
            console.log(Object.values(data),"data1reverse geo");
            this.getaddress1.next(res);
    });
        }
        observer();
        return this.getaddress1$;
  }
    getAddress2reverse(lat: any,lon:any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat=<value1>&lon=<value2>'.replace("<value1>",String(lat).replace("<value2>",String(lon)))).subscribe(data => {

    var res=JSON.parse(JSON.stringify(data));
        console.log((JSON.stringify(data)),"data1reverse geo");
        console.log(res.lat,"data2");
            console.log(Object.values(data),"data2reverse geo");
            this.getaddress2.next(res);
    });
        }
        observer();
        return this.getaddress2$;
  }
     getAddress2(address: any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/?addressdetails=1&format=json&limit=1&q='+address.replace(" ","+")).subscribe(data => {

    var res=JSON.parse(JSON.stringify(data))[0];
        console.log((JSON.stringify(data)),"data2");
        console.log(res.lat,"data2");
            console.log(Object.values(data),"data2");
           
            this.address2.next(res);
    });
        }
        observer();
        return this.address2$;
  }
   
}
