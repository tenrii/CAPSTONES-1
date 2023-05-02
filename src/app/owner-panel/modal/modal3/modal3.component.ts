import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal4Component } from '../modal4/modal4.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal3.component.html',
  styleUrls: ['./modal3.component.scss'],
})
export class Modal3Component implements OnInit {
  uid: any;
  roomForm!: FormGroup;
  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      RoomType: ['', [Validators.required]],
    });
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal4() {
    this.firestore.collection('Room').doc(this.uid).update(this.roomForm.value);
    const modalInstance = await this.m.create({
      component: Modal4Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
