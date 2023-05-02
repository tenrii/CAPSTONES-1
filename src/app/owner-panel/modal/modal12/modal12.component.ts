import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal13Component } from '../modal13/modal13.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal12',
  templateUrl: './modal12.component.html',
  styleUrls: ['./modal12.component.scss'],
})
export class Modal12Component implements OnInit {
  price = 1000;
  uid: any;
  roomForm!: FormGroup;
  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}

  pricePlus() {
    this.price++;
  }

  priceMinus() {
    if (this.price > 1000) {
      this.price--;
    }
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal13() {
    this.afs.collection('Room').doc(this.uid).update({ Price: this.price });
    const modalInstance = await this.m.create({
      component: Modal13Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
