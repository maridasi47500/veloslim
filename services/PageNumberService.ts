import { Injectable } from '@angular/core';
 import { CacheService } from "ionic-cache";
import { IonicStorageModule } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class PageNumberService {

 
  private pagenb:number = 1;
  myvalue:any;
  constructor(cache: CacheService) { 

  }
 
  nextpage() {
    if (this.pagenb == 1){
        this.pagenb=10;
    }else {
        this.pagenb = this.pagenb+10;
    }
    
  }
  loadList(pageNumber:any) {
    let url = "http://google.com/?page=" + pageNumber;
    let cacheKey = url;
    let groupKey = "googleSearchPages"

    
    
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
