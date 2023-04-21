import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AuthenticationService } from "../shared/authentication-service";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';


interface Seat {
  BedSpace: string;
  Occupied: boolean;
}

@Component({
  selector: 'app-room',
  templateUrl: 'room.page.html',
  styleUrls: ['room.page.scss'],
})
export class RoomPage implements OnInit {
  public data: any;
  studentList: any;
  roomId: any;
  rating: number = 0;
  collectionRoom = 'Room';

  seats: Seat[] = [];

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');
    console.log('id', this.firebaseService.getRoom(this.roomId));
    this.data = this.firebaseService.getRoom(this.roomId);

    for (let i = 1; i <= this.data['NumBedSpace']; i++) {
      this.seats.push({ BedSpace: 'B' + i, Occupied: false});

      this.firestore.collection(this.collectionRoom).doc(this.roomId).get()
      .subscribe(doc => {
        if (doc.exists) {
          const user = doc.data() as { BedSpaces: any[] };

          // Modify the favorites array locally
          user.BedSpaces.push(this.seats);

          // Update the entire array back to Firestore
          this.firestore.collection(this.collectionRoom).doc(this.roomId).update({ BedSpaces: user.BedSpaces })
            .then(() => {
              console.log('Favorites updated successfully!');
            })
            .catch(error => {
              console.error('Error updating favorites:', error);
            });
        } else {
          console.log('User document not found!');
        }
      });
  }
  console.log('a',this.seats);

  }

  selectSeat(seat: Seat) {
    if (!seat.Occupied) {
      seat.Occupied = true;
    }
    else{
      seat.Occupied = false;
    }
  }

  reserveBedspace(){

    this.firestore.collection(this.collectionRoom).doc(this.roomId).get()
    .subscribe(doc => {
      if (doc.exists) {
        const user = doc.data() as { BedSpaces: any[] };

        // Modify the favorites array locally
        user.BedSpaces.push(this.seats);

        // Update the entire array back to Firestore
        this.firestore.collection(this.collectionRoom).doc(this.roomId).update({ BedSpaces: user.BedSpaces })
          .then(() => {
            console.log('Favorites updated successfully!');
          })
          .catch(error => {
            console.error('Error updating favorites:', error);
          });
      } else {
        console.log('User document not found!');
      }
    });
    console.log('a',this.seats);
  }

  starIcon(index: number): string {
    if (this.rating >= index) {
      return 'star';
    } else {
      return 'star-outline';
    }
  }

  setRating(index: number): void {
    this.rating = index;
  }

}

