import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'Students';

  constructor(
    private firestore: AngularFirestore
  ) { }

  getRoom(id: any){

  }
}
