import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from '../shared/chat';

interface StudentData {
  Name: string;
  Price: number;
  Address: string;
  Rent: string;
  Img: any;
}

@Component({
  selector: 'app-test',
  templateUrl: 'test.page.html',
  styleUrls: ['test.page.scss'],
})
export class TestPage implements OnInit {
  studentList!: any[];
  studentData: StudentData;
  studentForm!: FormGroup;
  filePath!: any;
  imageName: any;
  image: any;

  constructor(
    private af: AngularFireStorage,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private iS: ImageService,
  ) {
    this.studentData = {} as StudentData;
  }

  ngOnInit() {
    this.imageName = this.nameGenerator();

    this.studentForm = this.fb.group({
      Name: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Rent: ['', [Validators.required]],
      Img: [] = this.imageName,
    });

    this.firebaseService.read_room().subscribe((data) => {
      this.studentList = data;
      console.log('stud list', this.studentList);
    });
  }

  upload($event: any) {
    this.filePath = $event.target.files[0];
    console.log('pic', this.filePath);
  }

  nameGenerator(n: number = 15){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charLength = characters.length;
    for(let i = 0; i < n; i++){
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  CreateRecord() {
    this.af.upload('images/' + this.imageName, this.filePath);
    if (this.af !== null) {
      this.firebaseService
        .create_room(this.studentForm.value)
        .then((resp) => {
          //Reset form
          this.studentForm.reset();
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
    record.EditRent = record.Rent;
  }

  UpdateRecord(recordRow: any) {
    let record: any = {};
    record['Name'] = recordRow.EditName;
    record['Price'] = recordRow.EditPrice;
    record['Address'] = recordRow.EditAddress;
    record['Rent'] = recordRow.EditRent;
    this.firebaseService.update_room(recordRow.id, record);
    recordRow.isEdit = false;
  }
}
