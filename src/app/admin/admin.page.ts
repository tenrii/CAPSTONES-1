import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface OwnerData{
FName: string;
LName: string;
Age: number;
Address: string;
Phone: string;
BusinessPermit: string;
Accepted: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  tenantList!: any[];
  ownerData: OwnerData;
  ownerList!: any[];
  truelist: any = new BehaviorSubject([]);
  falselist: any = new BehaviorSubject([]);

  constructor(
    private firebaseService: FirebaseService,
    private firestore: AngularFirestore
  ) {this.ownerData = {} as OwnerData}

  ngOnInit() {

    this.firebaseService.read_owner().subscribe((data) => {
      this.ownerList = data;
      this.filterF();
      this.filterT();
    });

    this.firebaseService.read_tenant().subscribe((data) => {
      this.tenantList = data;
      console.log('stud list', this.tenantList);
    });



  }

  filterF() {
    const filteredList = this.ownerList.filter((obj) => {
      return 'false' === obj.Accepted || false === obj.Accepted;
    });

    this.falselist.next(filteredList);
  }

  filterT() {
    const filteredList = this.ownerList.filter((obj) => {
      return 'true' === obj.Accepted || true === obj.Accepted;;
    });
    this.truelist.next(filteredList);
  }

  Approve(a: any) {
    this.firestore.collection('Owner').doc(a).update({ Accepted: true });
  }

  Reject(a: any) {
    this.firestore.collection('Owner').doc(a).update({ Accepted: false });
  }
}
