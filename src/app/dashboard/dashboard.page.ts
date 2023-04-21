import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

interface TenantData{
  FName: string;
  LName: string;
  Age: number;
  Address: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tenantForm!: FormGroup;
  tenantData: TenantData;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    public authService: AuthenticationService,
    public router: Router,
  ) { this.tenantData = {} as TenantData;
}

  ngOnInit() {
    this.tenantForm = this.fb.group({
      FName: ['', [Validators.required]],
      LName: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
    });

  }
  addDetails(){
    this.firebaseService
    .create_tenant(this.tenantForm.value)
    .then((res) => {
      this.router.navigate(['login']);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
