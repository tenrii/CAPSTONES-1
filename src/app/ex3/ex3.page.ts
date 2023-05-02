import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Chat, Message } from '../shared/chat';


@Component({
  selector: 'app-ex3',
  templateUrl: './ex3.page.html',
  styleUrls: ['./ex3.page.scss'],
})
export class Ex3Page implements OnInit {
  ownerList!: any[];

  constructor(private firebaseService: FirebaseService,private chatService: Chat,
  ) { }

  ngOnInit() {
    this.firebaseService.read_owner().subscribe((data) => {
      this.ownerList = data;
    });


  }
  /*async goToChatRoom(record: any) {
    const modalInstance = await this.m.create({
      component: EditModalComponent,
      componentProps: {
        record,
      },
    });
    modalInstance.present();
  }*/

}

