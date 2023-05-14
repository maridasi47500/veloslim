import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';

import { Routes, RouterModule } from '@angular/router';  
  

  const routes: Routes = [  
  {  
    path: '',  
    component: AddPage  
  }  
];  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    RouterModule.forChild(routes)  
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
