import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal6Component } from '../modal6/modal6.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';

interface Bed {
  uid: string;
  id: number;
  status: 'up' | 'down';
}

@Component({
  selector: 'app-modal5',
  templateUrl: './modal5.component.html',
  styleUrls: ['./modal5.component.scss'],
})
export class Modal5Component implements OnInit {
  uid: any;
  roomForm!: any;
  beds: Bed[] = [];
  n: number = 15;

  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {}

  addBed() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charLength = characters.length;
    for (let i = 0; i < this.n; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }

    const newBed: Bed = {
      uid: result,
      id: this.beds.length + 1,
      status: 'down',
    };
    this.beds.push(newBed);
    return result;
  }

  onBedChange(bed: Bed) {
    console.log(`Bed ${bed.id} is now ${bed.status}.`);
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal6() {
    this.firestore.collection('Room').doc(this.uid).update({ Bed: this.beds });
    const modalInstance = await this.m.create({
      component: Modal6Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
