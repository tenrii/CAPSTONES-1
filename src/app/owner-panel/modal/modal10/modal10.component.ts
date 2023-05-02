import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal11Component } from '../modal11/modal11.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal10',
  templateUrl: './modal10.component.html',
  styleUrls: ['./modal10.component.scss'],
})
export class Modal10Component implements OnInit {
  uid: any;
  roomForm!: FormGroup;
  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      Details: ['', [Validators.required]],
    });
    const messageTextarea: any = document.querySelector('#message');
    const messageCounter: any = document.querySelector('#message-counter');

    messageTextarea.addEventListener('input', function () {
      const length = messageTextarea.value.length;
      messageCounter.textContent = length + ' / 250 characters';
    });
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal11() {
    this.afs.collection('Room').doc(this.uid).update(this.roomForm.value);
    const modalInstance = await this.m.create({
      component: Modal11Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
