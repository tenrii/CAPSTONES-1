import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ex2',
  templateUrl: './ex2.page.html',
  styleUrls: ['./ex2.page.scss'],
})
export class Ex2Page implements OnInit {
  seats = [
    { id: 1, row: 1, column: 1, occupied: true },
    { id: 2, row: 1, column: 2, occupied: false },
    { id: 3, row: 1, column: 3, occupied: false },
    { id: 4, row: 2, column: 1, occupied: true },
    { id: 5, row: 2, column: 2, occupied: false },
    { id: 6, row: 2, column: 3, occupied: false },
    { id: 7, row: 3, column: 1, occupied: false },
    { id: 8, row: 3, column: 2, occupied: false },
    { id: 9, row: 3, column: 3, occupied: false }
  ];

  constructor(){}

  ngOnInit(){

  }

  toggleSeat(seat: any) {
    seat.occupied = !seat.occupied;
  }

}
