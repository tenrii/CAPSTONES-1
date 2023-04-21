import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Dashboard2PageRoutingModule } from './dashboard2-routing.module';

import { Dashboard2Page } from './dashboard2.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    Dashboard2PageRoutingModule
  ],
  declarations: [Dashboard2Page]
})
export class Dashboard2PageModule {}
