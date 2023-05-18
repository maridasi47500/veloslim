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
   getAddress1(address: any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/?addressdetails=1&format=json&limit=1&q='+address.replace(" ","+")).subscribe(data => {

        console.log(data);
           
            this.address1.next(data);
    });
        }
        observer();
        return this.address1$;
  }
     getAddress2(address: any) {
        const observer = async() => {
    var x = await this.http.get('https://nominatim.openstreetmap.org/?addressdetails=1&format=json&limit=1&q='+address.replace(" ","+")).subscribe(data => {

        console.log(data);
           
            this.address2.next(data);
    });
        }
        observer();
        return this.address2$;
  }
   
}
