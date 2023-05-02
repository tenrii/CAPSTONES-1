import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.page.html',
  styleUrls: ['./edit-room.page.scss'],
})
export class EditRoomPage{
  selectedFiles: any = FileList;
  images: { name: any; url: any }[] = [];
  uid: any;
  q: any = 1;

  constructor(private storage: AngularFireStorage) {}

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles.item(i);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push({ name: file.name, url: reader.result?.toString() });
        for (let f = 0; i < this.q; f++) {
          ++this.q;
        }
      };
    }
  }
}

