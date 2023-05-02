import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRoomPageRoutingModule } from './edit-room-routing.module';

import { EditRoomPage } from './edit-room.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditRoomPageRoutingModule,
  ],
  declarations: [EditRoomPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class EditRoomPageModule {}
