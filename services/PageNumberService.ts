import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class PageNumberService {
 
  private pagenb:number = 1;
 
  constructor() { }
 
  nextpage() {
    if (this.pagenb == 1){
        this.pagenb=10;
    }else {
        this.pagenb = this.pagenb+10;
    }
    
  }
  previouspage() {
    if(this.pagenb == 10) {
        this.pagenb=1;
    }else {
        this.pagenb = this.pagenb-10;
    }
    
  }
 
  getpagenb() {
    return this.pagenb;
  }
  setpagenb(id:any) {
    this.pagenb=id;
  }
}
