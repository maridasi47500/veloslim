import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Trajet } from './trajet';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  storage:any;
  mytrajet:Trajet[]=[];
  private trajetsList = new BehaviorSubject(this.mytrajet);
          trajetsList$ = this.trajetsList.asObservable();

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchTrajets(): Observable<Trajet[]> {
    return this.trajetsList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getTrajets();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getTrajets(){
    return this.storage.executeSql('SELECT * FROM trajets', []).then((res: any) => {
      let items: Trajet[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            lat1: res.rows.item(i).artist_name,  
            lng1: res.rows.item(i).artist_name,  
            lat2: res.rows.item(i).artist_name,  
            lng2: res.rows.item(i).artist_name,  
            address1: res.rows.item(i).artist_name,  
            trajet: res.rows.item(i).artist_name,  
            user_id: res.rows.item(i).artist_name,  
            address2: res.rows.item(i).trajet_name
           });
        }
      }
      this.trajetsList.next(items);
    });
  }
  // Add
  addTrajet(mydata:any) {
    let data = [mydata.address1, mydata.address2,mydata.lat1,mydata.lon1,mydata.lat2,mydata.lon2,mydata.trajet];
    return this.storage.executeSql('INSERT INTO trajets (address1, address2,lat1,lng1,lat2,lng2,trajet) VALUES (?, ?,?,?,?,?,?)', data)
    .then((res:any) => {
      this.getTrajets();
    });
  }
 
  // Get single object
  getTrajet(id:any): Promise<Trajet> {
    return this.storage.executeSql('SELECT * FROM trajets WHERE id = ?', [id]).then((res:any) => { 
      return {
        id: res.rows.item(0).id,
        artist_name: res.rows.item(0).artist_name,  
        trajet_name: res.rows.item(0).trajet_name
      }
    });
  }
  // Update
  updateTrajet(id:any, trajet: Trajet) {
    let data = [trajet.address1, trajet.address2];
    return this.storage.executeSql(`UPDATE trajets SET address1 = ?, address2 = ? WHERE id = ${id}`, data)
    .then((data:any) => {
      this.getTrajets();
    })
  }
  // Delete
  deleteTrajet(id:any) {
    return this.storage.executeSql('DELETE FROM trajets WHERE id = ?', [id])
    .then((_:any) => {
      this.getTrajets();
    });
  }
}