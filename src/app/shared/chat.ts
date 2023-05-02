import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { CollectionReference, getDocs, getDocsFromCache} from 'firebase/firestore';
import { Observable, map, switchMap, tap } from 'rxjs';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: any;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

export interface Conversation{
  messages: Message[];
  createdAt: any;
  uid: string;
}

@Injectable({
  providedIn: 'root',
})
export class Chat {
  currentUser!: User;
  public va!: string;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,
    ) {
    this.afs.firestore.enablePersistence()

    this.afAuth.onAuthStateChanged((user: any) => {
      console.log('Change:', user);
      this.currentUser = user;
    });
  }

  async signUp({ email, password }: any) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log('result: ', credential);
    const uid = credential.user?.uid;

    return this.afs.doc(`users/${uid}`).set({
      uid,
      email: credential.user?.email,
    });
  }

  signIn({ email, password }: any) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.afAuth.signOut();
  }

  async addConversation(ownerID: any){
    const ar: any = [];
    const tid = JSON.parse(localStorage.getItem('user') || '{}')['uid'];
    const fuse = `${ownerID}#${tid}`;
    const uid = tid;

    try{
      const db = this.afs.collection("Conversation").ref
      const gd = await getDocs(db);
      gd.forEach((doc: any) =>{{
        ar.push({
          uid: doc.data().uid,
          docId: doc.id});
      }})
      const id = ar.find((a:any)=>{
        return a.uid === fuse
      })
      if(!id){
        this.afs.collection('Conversation').add({
          uid: fuse,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }).then((res) =>{
          this.va = res.id;
          this.afs.collection('Owner').doc(ownerID).update({
            messages: [res.id]
          })
          this.afs.collection('Tenant').doc(tid).update({
            messages: [res.id]
          })
        })
      }
      else{
        this.va = id.docId;
      }
    }
    catch(e){

    }

    this.afs.collection('Converation')
    return this.afs.collection('Conversation')
  }

  addChatMessage(msg: any, record: any) {
    console.log('as', this.va);
    return this.afs.collection('Conversation').doc(this.va).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        msg,
        from: this.currentUser.uid,
        to: record,
        createdAt: Date.now(),})
    });
  }

  getChatMessage() {
    let users: [] = [];

    return this.getUsers().pipe(
      switchMap((res: any) => {
        console.log('res', res);
        users = res;

        return this.afs
          .collection('message', (ref) => ref.orderBy('createdAt'))
          .valueChanges({
            idField: 'id',
          }) as Observable<Message[]>;
      }),
      map((messages: any) => {
        for (let m of messages) {
          m.fromName = this.getUserForMsg(m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        console.log('all message: ', messages);
        return messages;
      }),
      tap((a: any) => {
        console.log('b', a);
      })
    );
  }

  getUsers() {
    return this.afs
      .collection('users')
      .valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getUserForMsg(msgFromId: any, users: User[]) {
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'Deleted';
  }
}
