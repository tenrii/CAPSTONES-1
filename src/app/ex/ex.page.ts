import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ex',
  templateUrl: './ex.page.html',
  styleUrls: ['./ex.page.scss'],
})
export class ExPage implements OnInit {

  messagesRef!: AngularFireList<any>;
  messages!: Observable<any[]>;
  messageText!: string;

  constructor(private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.messagesRef = this.db.list('messages');
    this.messages = this.messagesRef.valueChanges();
  }
  sendMessage() {
    if (this.messageText.trim() !== '') {
      this.messagesRef.push({
        text: this.messageText.trim(),
        timestamp: Date.now()
      });
      this.messageText = '';
    }
  }
}

