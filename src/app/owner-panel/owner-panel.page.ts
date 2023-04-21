import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from '../shared/chat';

interface RoomData {
  Name: string;
  Price: number;
  Address: string;
  NumBedSpace: number;
  Detail: string;
  Available: number;
}

@Component({
  selector: 'app-owner-panel',
  templateUrl: './owner-panel.page.html',
  styleUrls: ['./owner-panel.page.scss'],
})
export class OwnerPanelPage implements OnInit {
  roomList!: any[];
  roomData!: RoomData;
  roomForm!: FormGroup;
  nbs: any = 1;

  constructor(
    private af: AngularFireStorage,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
  ) {
    this.roomData = {} as RoomData;
   }

  ngOnInit() {

    this.roomForm = this.fb.group({
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      NumBedSpace: ['', [Validators.required]],
      Detail: ['', [Validators.required]],
    });

    this.firebaseService.read_room().subscribe((data) => {
      this.roomList = data;
      console.log('stud list', this.roomList);
    });
}

CreateRecord() {
  if (this.af !== null) {
    this.firebaseService
      .create_room(this.roomForm.value)
      .then((resp) => {
        //Reset form
        this.roomForm.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

RemoveRecord(rowID: any) {
  this.firebaseService.delete_room(rowID);
}

EditRecord(record: any) {
  record.isEdit = true;
  record.EditName = record.Name;
  record.EditPrice = record.Price;
  record.EditAddress = record.Address;
  record.EditNumBedSpace = record.NumBedSpace;
  record.EditDetail = record.Detail;
}

UpdateRecord(recordRow: any) {
  let record: any = {};
  record['Name'] = recordRow.EditName;
  record['Price'] = recordRow.EditPrice;
  record['Address'] = recordRow.EditAddress;
  record['NumBedSpace'] = recordRow.EditNumBedSpace;
  record['Detail'] = recordRow.EditDetail;
  this.firebaseService.update_room(recordRow.id, record);
  recordRow.isEdit = false;
}

}
