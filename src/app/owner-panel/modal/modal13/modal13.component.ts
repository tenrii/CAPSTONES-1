import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal14Component } from '../modal14/modal14.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal13',
  templateUrl: './modal13.component.html',
  styleUrls: ['./modal13.component.scss'],
})
export class Modal13Component implements OnInit {
  uid: any;
  public data: any;
  roomList: any[] = [];
  roomId: any;
  constructor(
    private m: ModalController,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.load();
  }

  back() {
    this.m.dismiss();
  }

  async load() {
    if (!this.firebaseService.loading) {
      this.firebaseService.read_room().subscribe(() => {
        this.load();
      });
      return;
    }
    console.log('id', this.firebaseService.getRoom(this.uid));
    this.data = this.firebaseService.getRoom(this.uid);
  }

  async gotoModal14() {
    const modalInstance = await this.m.create({
      component: Modal14Component,
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
