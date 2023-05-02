import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AnimationController, ModalController } from '@ionic/angular';
import { CreateModalComponent } from './create-modal/create-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { Modal1Component } from './modal/modal1/modal1.component';

interface RoomData {
  Name: string;
  Price: number;
  Address: string;
  NumBedSpace: number;
  Detail: string;
  Available: number;
}

@Component({
  selector: 'app-owner-panel',
  templateUrl: './owner-panel.page.html',
  styleUrls: ['./owner-panel.page.scss'],
})
export class OwnerPanelPage implements OnInit {
  roomList!: any[];
  roomData!: RoomData;
  roomForm!: FormGroup;
  nbs: any = 1;
  isModalOpen = false;

  constructor(
    private animationCtrl: AnimationController,
    private m: ModalController,
    private af: AngularFireStorage,
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.roomData = {} as RoomData;
  }

  ngOnInit() {
    this.roomForm = this.fb.group({
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      NumBedSpace: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
    });

    this.firebaseService.read_room().subscribe((data) => {
      this.roomList = data;
      console.log('stud list', this.roomList);
    });
  }

  CreateRecord() {
    if (this.af !== null) {
      this.firebaseService
        .create_room(this.roomForm.value)
        .then((resp) => {
          //Reset form
          this.roomForm.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  RemoveRecord(rowID: any) {
    this.firebaseService.delete_room(rowID);
  }

  async gotoModal1() {
    const modalInstance = await this.m.create({
      component: Modal1Component,
      backdropDismiss: false,
    });
    this.isModalOpen = true;
    return await modalInstance.present();
  }

async gotoModal() {
    const modalInstance = await this.m.create({
      component: CreateModalComponent,
      backdropDismiss: false,
    });
    this.isModalOpen = true;
    return await modalInstance.present();
}

  async gotoEditModal(record: any) {
    const modalInstance = await this.m.create({
      component: EditModalComponent,
      componentProps: {
        record,
      },
    });
    modalInstance.present();
  }

  closeModal() {
    this.isModalOpen = false;
    this.m.dismiss();
  }
}
