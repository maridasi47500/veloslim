import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }
    private pagenb = new BehaviorSubject("");
          pagenb$ = this.pagenb.asObservable();

private isServiceReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
getServiceState(){
    return this.isServiceReady.asObservable();
}
  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
    this.isServiceReady.next(true);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
    public async nextpage() {
        var pagenb = await this._storage?.get('name');
        if (!pagenb) {
            this.pagenb.next("1");
            }
    if (pagenb == 1){
        this.pagenb.next("10");
    }else {
        this.pagenb.next(String(pagenb+10));
    }
    this.setitem(pagenb);
    return this.pagenb$;
    
  }
    public async prevpage() {
        var pagenb = await this._storage?.get('name');
        if (!pagenb) {
            this.setitem(null);
            this.pagenb.next("1");
        }else {
            if(pagenb == 10) {
                this.pagenb.next("1");
            }else {
                this.pagenb.next(String(pagenb-10));
            }
            this.setitem(pagenb);
            
        }
        return this.pagenb$;
    
  }
  public async getitem(){
    const name = await this._storage?.get('name');
    console.log(name,"NAMMME")
    return name;
  }
  public async setitem(item:any){
      await this.set('name', item);
  }
}
