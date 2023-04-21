import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}
  ngOnInit() {}

  logInTenant(email: any , password: any) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['home'])
          .then(() => {
            window.location.reload();
          });
        } else {
          window.alert('Email is not verified')
          return false;
        }
      }).catch((error) => {
        window.alert(error.message)
      });

    }

    logInOwner(email: any , password: any) {
      this.authService.SignIn(email.value, password.value)
        .then((res) => {
          if(this.authService.isEmailVerified) {
            this.router.navigate(['home'])
            .then(() => {
              window.location.reload();
            });
          } else {
            window.alert('Email is not verified')
            return false;
          }
        }).catch((error) => {
          window.alert(error.message)
        });

      }
    //switchClick(){
    //  const v = document.querySelector('.img__btn');
    //  const x = document.querySelector('.cont');

    //  v?.addEventListener('click', () => {
    //    x?.classList.toggle('s--signup');
    //  });
    //}
}

