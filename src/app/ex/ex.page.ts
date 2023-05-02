import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Chat, Message } from '../shared/chat';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ex',
  templateUrl: './ex.page.html',
  styleUrls: ['./ex.page.scss'],
})
export class ExPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  messages!: Observable<Message[]>;
  newMsg = '';

  constructor(private chatService: Chat, private router: Router) {}

  ngOnInit() {
    this.messages = this.chatService.getChatMessage();
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg, this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  signOut() {
    this.chatService.signOut().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
}
