import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';  
import {DbService} from '../services/db.service';
import { FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private toast: ToastController,private modalCtrl: ModalController,private db:DbService,public formBuilder: FormBuilder) { }
       foo: any;
        bar: any;
        lat1:any;
        lat2:any;
        address1:any;
        address2:any;
        mainForm: any;
        Data: any[] = [];
        lon1:any;
        lon2:any;
        trajet:any;
  ngOnInit() {
        this.db.dbState().subscribe((res) => {
    if(res){
      this.db.fetchTrajets().subscribe(item => {
        this.Data = item
      })
    }
  });
  this.mainForm = this.formBuilder.group({
    lon1: [this.lon1],
    lat2: [this.lat2],
    lon2: [this.lon2],
    address1: [this.address1],
    trajet: [this.trajet],
     address2: [this.address2],
    lat1: [this.lat1]
  })
  }
  storedata() {
  this.db.addTrajet(this.mainForm.value);
}
deleteTrajet(id:any){
  this.db.deleteTrajet(id).then(async(res:any) => {
    let toast = await this.toast.create({
      message: 'Song deleted',
      duration: 2500
    });
    toast.present();      
  })
}
   confirm() {
    this.modalCtrl.dismiss("", 'confirm');
   }
  cancel(){
      this.modalCtrl.dismiss("", 'cancel');
      
  }
  dismiss() {  
    this.modalCtrl.dismiss();  
  }  
  onWillDismiss($ev:any){
  }
}
