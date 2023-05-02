import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal10Component } from '../modal10/modal10.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal9',
  templateUrl: './modal9.component.html',
  styleUrls: ['./modal9.component.scss'],
})
export class Modal9Component implements OnInit {
  uid: any;
  roomForm!: FormGroup;

  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      Title: ['', [Validators.required]],
    });
    const messageTextarea: any = document.querySelector('#message');
    const messageCounter: any = document.querySelector('#message-counter');

    messageTextarea.addEventListener('input', function () {
      const length = messageTextarea.value.length;
      messageCounter.textContent = length + ' / 50 characters';
    });
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal10() {
    this.afs.collection('Room').doc(this.uid).update(this.roomForm.value);
    const modalInstance = await this.m.create({
      component: Modal10Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
