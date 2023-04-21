import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

export interface User{
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class Chat {
  currentUser: User[] = [];

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ){
    this.afAuth.onAuthStateChanged((user: any) => {
      console.log('Change:', user);
      this.currentUser = user;
    })
  }

  async signUp(email: any, password: any){
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );

    console.log('result: ', credential);
    const uid = credential.user?.uid;

    return this.afs.doc(`users/${uid}`)
    .set({
      uid,
      email: credential.user?.email,
    });
  }

}
