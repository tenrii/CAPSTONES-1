import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Star {
  userId: any;
  movieId: any;
  value: number;
}


@Injectable()
export class StarService {

  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId: any) {
    const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getMovieStars(movieId: any) {
    const starsRef = this.afs.collection('stars', ref => ref.where('movieId', '==', movieId) );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId: any, movieId: any, value: any) {
    // Star document data
    const star: Star = { userId, movieId, value };

    // Custom doc ID for relationship
    const starPath = `stars/${star.userId}_${star.movieId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(star)
  }

}
