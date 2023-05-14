import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';  
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
       foo: any;
        bar: any;
        lat1:any;
        lat2:any;
        lon1:any;
        lon2:any;
        trajet:any;
  ngOnInit() {
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
