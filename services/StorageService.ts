import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
    public async nextpage() {
        var pagenb = await this.storage.get('name');
        if (!pagenb) {
            pagenb=1
            }
    if (pagenb == 1){
        pagenb=10;
    }else {
        pagenb = pagenb+10;
    }
    this.setitem(pagenb);
    return pagenb;
    
  }
    public async prevpage() {
        var pagenb = await this.storage.get('name');
        if (!pagenb) {
            this.setitem(null);
            return null;
        }else {
            if(pagenb == 10) {
                pagenb=1;
            }else {
                pagenb = pagenb-10;
            }
            this.setitem(pagenb);
            return pagenb;
        }
    
  }
  public async getitem(){
    const name = await this.storage.get('name');
    return name;
  }
  public async setitem(item:any){
      await this.storage.set('name', item);
  }
}
