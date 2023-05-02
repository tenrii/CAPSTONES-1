import { Component, OnInit } from '@angular/core';
import { ImageUpload } from './../../services/image-upload.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent implements OnInit {
  barStatus = false;
  imageUploads: any = [];
  constructor(private firebaseUploadService: ImageUpload) {}

  ngOnInit() {}

  //Upload image action
  uploadPhoto(event: any) {
    this.barStatus = true;
    this.firebaseUploadService.storeImage(event.target.files[0]).then(
      (res) => {
        if (res) {
          console.log(res);
          this.imageUploads.unshift(res);
          this.barStatus = false;
        }
      },
      (error: any) => {
        this.barStatus = false;
      }
    );
  }
}
