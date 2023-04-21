import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestPageRoutingModule } from './test-routing.module';

import { TestPage } from './test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TestPageRoutingModule,
  ],
  declarations: [TestPage],
})
export class TestPageModule {}
