import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal5Component } from '../modal5/modal5.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal4',
  templateUrl: './modal4.component.html',
  styleUrls: ['./modal4.component.scss'],
})
export class Modal4Component implements OnInit {
  uid: any;
  roomForm!: FormGroup;
  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      Street: ['', [Validators.required]],
      Barangay: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Province: ['', [Validators.required]],
      ZIP: ['', [Validators.required]],
    });
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal5() {
    this.firestore.collection('Room').doc(this.uid).update(this.roomForm.value);
    const modalInstance = await this.m.create({
      component: Modal5Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
