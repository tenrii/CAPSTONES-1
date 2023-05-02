import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal7Component } from '../modal7/modal7.component';

@Component({
  selector: 'app-modal6',
  templateUrl: './modal6.component.html',
  styleUrls: ['./modal6.component.scss'],
})
export class Modal6Component implements OnInit {
  uid: any;
  constructor(private m: ModalController) {}

  ngOnInit() {}

  back() {
    this.m.dismiss();
  }

  async gotoModal7() {
    const modalInstance = await this.m.create({
      component: Modal7Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
