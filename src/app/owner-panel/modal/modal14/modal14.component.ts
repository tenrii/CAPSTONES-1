import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal14',
  templateUrl: './modal14.component.html',
  styleUrls: ['./modal14.component.scss'],
})
export class Modal14Component implements OnInit {
  constructor(private m: ModalController) {}

  ngOnInit() {}

  back() {
    this.m.dismiss();
  }

  done() {
    window.location.reload();
  }
}
