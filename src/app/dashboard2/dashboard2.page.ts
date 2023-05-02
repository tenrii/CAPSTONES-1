import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

interface OwnerData {
  FName: string;
  LName: string;
  Age: number;
  Address: string;
  Accepted: string;
}

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.page.html',
  styleUrls: ['./dashboard2.page.scss'],
})
export class Dashboard2Page implements OnInit {
  ownerForm!: FormGroup;
  ownerData: OwnerData;
  userData: any;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.ownerData = {} as OwnerData;
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user') || '{}')['email'];
    this.ownerForm = this.fb.group({
      FName: ['', [Validators.required]],
      LName: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Email: this.userData,
      Accepted: 'false',
    });
    console.log(
      'data',
      JSON.parse(localStorage.getItem('user') || '{}')['email']
    );
  }
  addDetails() {
    this.firebaseService
      .create_owner(this.ownerForm.value)
      .then((res) => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
