import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Chat } from '../shared/chat';

@Component({
  selector: 'app-ex2',
  templateUrl: './ex2.page.html',
  styleUrls: ['./ex2.page.scss'],
})

export class Ex2Page implements OnInit {
  credentialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: Chat,
    ){}

  ngOnInit(){
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    console.log('a', this.chatService.currentUser);
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signUp(this.credentialForm.value).then(user => {
      loading.dismiss();
      this.router.navigateByUrl('/ex', {replaceUrl: true});
    }, async err => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Sign up Failed',
        message: err.message,
        buttons: ['OK'],
      });

      await alert.present();
    })
  }

  async signIn(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signIn(this.credentialForm.value).then((res) => {
      loading.dismiss();
      this.router.navigateByUrl('/ex', {replaceUrl: true});
    }, async (err) => {
      loading.dismiss();
      const alert = await this.alertController.create({
        header: ':(',
        message: err.message,
        buttons: ['OK'],
      });

      await alert.present();
    })
  }

  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
  }}
