import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';

import { Routes, RouterModule } from '@angular/router';  
  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    IonicModule,
    AddPageRoutingModule,
    RouterModule.forChild(routes)  
  ],
  declarations: [AddPage]
})
export class AddPageModule {}
