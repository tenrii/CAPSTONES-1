import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal12Component } from '../modal12/modal12.component';

@Component({
  selector: 'app-modal11',
  templateUrl: './modal11.component.html',
  styleUrls: ['./modal11.component.scss'],
})
export class Modal11Component implements OnInit {
  uid: any;
  constructor(private m: ModalController) {}

  ngOnInit() {}

  back() {
    this.m.dismiss();
  }

  async gotoModal12() {
    const modalInstance = await this.m.create({
      component: Modal12Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
