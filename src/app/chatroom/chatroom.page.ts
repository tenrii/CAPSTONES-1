import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Chat, Message } from '../shared/chat';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  ownerId: any;
  public data: any;
  messages!: Observable<Message[]>;
  newMsg = '';

  constructor(
    private firebaseService: FirebaseService,
    private chatService: Chat,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.ex();
    this.messages = this.chatService.getChatMessage();
  }

  async ex(){
    await this.load();
    this.chatService.addConversation(this.ownerId);
  }

  async load() {
    if (!this.firebaseService.loading) {
      this.firebaseService.read_owner().subscribe(() => {
        this.load();
      });
      return;
    }
    this.ownerId =
      this.route.snapshot.paramMap.get('id') ||
      window.location.pathname.split('/')[2];
    console.log('id', this.firebaseService.getOwner(this.ownerId));
    this.data = this.firebaseService.getOwner(this.ownerId);

}

sendMessage() {
  this.chatService.addChatMessage(this.newMsg, this.data.id).then(() => {
    this.newMsg = '';
    this.content.scrollToBottom();
  });
}



}
