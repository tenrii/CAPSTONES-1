import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  tenantList!: any[];
  ownerList!: any[];

  constructor(
    private firebaseService: FirebaseService,

    ) {}

  ngOnInit() {
    this.firebaseService.read_tenant().subscribe((data) => {
      this.tenantList = data;
      console.log('stud list', this.tenantList);
    });

    this.firebaseService.read_owner().subscribe((data) => {
      this.ownerList = data;
      console.log('stud list', this.ownerList);
    });
  }

  RemoveRecord(rowID: any) {
    this.firebaseService.delete_owner(rowID);
  }

  EditRecord(record: any) {
    record.isEdit = true;
    record.EditFName = record.FName;
    record.EditLName = record.LName;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
    record.EditisPermited = record.isPermited;
  }

  UpdateRecord(recordRow: any) {
    let record: any = {};
    record['FName'] = recordRow.EditFName;
    record['LName'] = recordRow.EditLName;
    record['Age'] = recordRow.EditAge;
    record['Address'] = recordRow.EditAddress;
    record['isPermited'] = recordRow.EditisPermited;
    this.firebaseService.update_owner(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
