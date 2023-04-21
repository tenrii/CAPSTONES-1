import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OwnerPanelPageRoutingModule } from './owner-panel-routing.module';

import { OwnerPanelPage } from './owner-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OwnerPanelPageRoutingModule
  ],
  declarations: [OwnerPanelPage]
})
export class OwnerPanelPageModule {}
