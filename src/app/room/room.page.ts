import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from '../shared/authentication-service';
import 'firebase/firestore';
import { lastValueFrom } from 'rxjs';

interface Seat {
  BedSpace: string;
  Occupied: boolean;
  Occupant: string;
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
  email = JSON.parse(localStorage.getItem('user') || '{}')['email'];

  seats: Seat[] = [];

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    if (!this.firebaseService.loading) {
      this.firebaseService.read_room().subscribe(() => {
        this.load();
      });
      return;
    }

    this.roomId =
      this.route.snapshot.paramMap.get('id') ||
      window.location.pathname.split('/')[2];
    console.log('id', this.firebaseService.getRoom(this.roomId));
    this.data = this.firebaseService.getRoom(this.roomId);

    this.seats = [];
    if (!this.data['BedSpaces']) {
      for (let i = 1; i <= this.data['NumBedSpace']; i++) {
        this.seats.push({ BedSpace: 'B' + i, Occupied: false , Occupant: ''});
      }
    } else {
      const a = JSON.parse(this.data['BedSpaces']);
      this.seats.push(...[...a]);

    }

    console.log('c', this.email);
  }

  selectSeat(seat: Seat) {
    if (!seat.Occupied) {
      seat.Occupied = true;
      seat.Occupant = this.email;
    } else {
      seat.Occupied = false;
      seat.Occupant = '';
    }
  }

  reserveBedspace() {
    this.firestore
      .collection(this.collectionRoom)
      .doc(this.roomId)
      .get()
      .subscribe((doc) => {
        if (doc.exists) {
          const user = doc.data() as { BedSpaces: any };

          // Modify the favorites array locally
          user.BedSpaces = this.seats;
          const bs = JSON.stringify(user.BedSpaces);

          // Update the entire array back to Firestore
          this.firestore
            .collection(this.collectionRoom)
            .doc(this.roomId)
            .update({ BedSpaces: bs })
            .then(() => {
              console.log('Favorites updated successfully!');
            })
            .catch((error) => {
              console.error('Error updating favorites:', error);
            });
        } else {
          console.log('User document not found!');
        }
      });
    console.log('a', this.seats);
  }

  bedSpaceEvent(){
    for (let j = 1; j <= this.data['NumBedSpace']; j++){
      if(this.seats[j].Occupant != null){

      }
    }
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
