import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal8Component } from '../modal8/modal8.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-modal7',
  templateUrl: './modal7.component.html',
  styleUrls: ['./modal7.component.scss'],
})
export class Modal7Component implements OnInit {
  uid: any;
  roomForm!: FormGroup;
  amenities: any[] = [];
  constructor(
    private m: ModalController,
    private fb: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.roomForm = this.fb.group({
      Amenities: [[], Validators.required],
    });
  }

  onChange(event: any) {
    if (event.target.checked) {
      const am = this.amenities.findIndex((a: any) => a === event.target.value);
      if (am == -1) {
        this.amenities.push(event.target.value);
      }
    } else {
      const am = this.amenities.findIndex((a: any) => a === event.target.value);
      if (am >= 0) {
        this.amenities.splice(am, 1);
      }
    }
    this.roomForm.get('Amenities')?.setValue(this.amenities);
    console.log('a', this.amenities);
  }

  back() {
    this.m.dismiss();
  }

  async gotoModal8() {
    this.firestore.collection('Room').doc(this.uid).update(this.roomForm.value);
    const modalInstance = await this.m.create({
      component: Modal8Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
