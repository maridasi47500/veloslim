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
this.createDatabaseObject()
      
    });
  }
  createDatabaseObject(): void {
      this.sqlite.create({
        name: 'my_otherdb_name.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          console.log(db)
          
                    this.storage = db;
          this.getFakeData();
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
          //alert("this data"+data)
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
this.storage['database_filled'] = true;
this.getTrajets(1);
            this.isDbReady.next(true);
            
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getTrajets(offset:any){
      var limit:any;
      if (offset === 1) {
          limit = 9;
      }else{
          limit = 10;
      }
      const observer = async() => {
         
          
          var x = await (this.storage.executeSql('SELECT * FROM trajets limit ? offset ?', [limit, offset]).then((res: any) => {
      let items: Trajet[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            lat1: res.rows.item(i).lat1,  
            lng1: res.rows.item(i).lng1,  
            lat2: res.rows.item(i).lat2,  
            lng2: res.rows.item(i).lng2,  
            address1: res.rows.item(i).address1,  
            trajet: res.rows.item(i).trajet,  
            user_id: res.rows.item(i).user_id,  
            address2: res.rows.item(i).address2
           });
        }
      }
      this.trajetsList.next(items);
    }));
      }
      observer();
      return this.trajetsList$;
      
  }
  // Add
  addTrajet(mydata:any) {
    let data = [mydata.address1, mydata.address2,mydata.lat1,mydata.lon1,mydata.lat2,mydata.lon2,mydata.trajet];
    console.log(data, "DAATATATA");
    const observer = async() => {
         
          
          var x = await (this.storage.executeSql('INSERT INTO trajets (address1, address2,lat1,lng1,lat2,lng2,trajet) VALUES (?, ?,?,?,?,?,?)', data)
    .then((res:any) => {
        console.log(res.rows.item(0), "OKOKOK add to db")
      
      this.getTrajets(1);
    }));
    
    };
    observer();
    return this.trajetsList$;

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
      this.getTrajets(1);
    })
  }
  // Delete
  deleteTrajet(id:any) {
    return this.storage.executeSql('DELETE FROM trajets WHERE id = ?', [id])
    .then((_:any) => {
      this.getTrajets(1);
    });
  }
}