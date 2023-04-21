import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userDoc!: AngularFirestoreDocument<any>;
  movieDoc!: AngularFirestoreDocument<any>;

  user!: Observable<any>;
  movie!: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.userDoc = this.afs.doc('users/test-user-3')
    this.movieDoc = this.afs.doc('movies/battlefield-earth')

    this.movie = this.movieDoc.valueChanges()
    this.user = this.userDoc.valueChanges()
  }

  get movieId() {
    return this.movieDoc.ref.id
  }

  get userId() {
    return this.userDoc.ref.id
  }

}
