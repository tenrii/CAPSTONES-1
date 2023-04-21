import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../shared/authentication-service";
@Component({
  selector: 'app-verify-email2',
  templateUrl: './verify-email2.page.html',
  styleUrls: ['./verify-email2.page.scss'],
})
export class VerifyEmail2Page implements OnInit {
  constructor(
    public authService: AuthenticationService
  ) { }
  ngOnInit() {
  }
}
