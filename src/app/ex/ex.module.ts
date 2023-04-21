import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExPageRoutingModule } from './ex-routing.module';

import { ExPage } from './ex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExPageRoutingModule
  ],
  declarations: [ExPage]
})
export class ExPageModule {}
