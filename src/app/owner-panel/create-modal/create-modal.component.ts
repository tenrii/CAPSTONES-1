import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

interface RoomData {
  Name: string;
  Price: number;
  Address: string;
  NumBedSpace: number;
  Detail: string;
  Available: number;
}
@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
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

}
