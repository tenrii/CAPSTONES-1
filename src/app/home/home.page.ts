import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from "../shared/authentication-service";

interface RoomData {
  Id: any;
  Name: string;
  Price: number;
  Address: string;
  Rent: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  roomList: any[] = [];
  roomData!: RoomData;
  userProfileData: any;
  list: any = new BehaviorSubject([]);
  listEmail: any = new BehaviorSubject([]);
  filterPlace: any;
  filterRent: any;
  address: any;
  rent: any;
  price: any = { lower: 0, upper: 5000 };
  priceMax: any = 0;
  pc: number = 10;
  myIndex: number = 0;
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    loop: true,
    autoplay: {
          delay: 4000,
          disableOnInteraction: false,
    }
  };
  email = JSON.parse(localStorage.getItem('user') || '{}' )['email'];


  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.roomData = {} as RoomData;
  }

  ngOnInit() {
    this.firebaseService.read_room().subscribe((data) => {
      this.roomList = data;

      this.filterPlace = [...new Set(this.roomList.map((a) => a.Address))];
      this.filterRent = [...new Set(this.roomList.map((a) => a.Rent))];

      const sorted = this.roomList.sort((a: any, b: any) => {
        const pa = parseInt(a.Price);
        const pb = parseInt(b.Price);
        return pa - pb;
      });
      this.priceMax = sorted.pop().Price;
      this.price.upper = this.priceMax;

      this.filter();
    });

    this.firebaseService.read_room().subscribe((data) => {
      this.roomList = data;
      console.log('owner list', this.roomList);
      this.filterEmail();
    });
    console.log('e',this.filterEmail());
    console.log('datas', this.email);
  }

  getAd(address: any) {
    return this.filter();
  }
  getRe(rent: any) {
    return this.filter();
  }

  filter() {
    const filteredList = this.roomList.filter((obj) => {
      return (
        (!this.address || this.address === obj.Address) &&
          (!this.rent || this.rent === obj.Rent) &&
          (this.price.upper >= obj.Price &&
          this.price.lower <= obj.Price)
      );
    });
    this.list.next(filteredList);
  }

  filterEmail() {
    const filteredEList = this.roomList.filter((a) => {
      return (
        (!this.address || this.email === a.Email)
      );
    });
    this.listEmail.next(filteredEList);
  }

  filterPrice() {
    this.filter();
  }
}
