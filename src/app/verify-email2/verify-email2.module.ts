import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmail2PageRoutingModule } from './verify-email2-routing.module';

import { VerifyEmail2Page } from './verify-email2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmail2PageRoutingModule
  ],
  declarations: [VerifyEmail2Page]
})
export class VerifyEmail2PageModule {}
