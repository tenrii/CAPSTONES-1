import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Modal9Component } from '../modal9/modal9.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-modal8',
  templateUrl: './modal8.component.html',
  styleUrls: ['./modal8.component.scss'],
})
export class Modal8Component implements OnInit {
  selectedFiles: any = FileList;
  images: { name: any; url: any }[] = [];
  uid: any;

  constructor(
    private m: ModalController,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles.item(i);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push({ name: file.name, url: reader.result?.toString() });
      };
    }
  }

  uploadImages() {}

  back() {
    this.m.dismiss();
  }

  async gotoModal9() {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles.item(i);
      const path = `${this.uid}/${Date.now()}_${file.name}`;
      const uploadTask = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            const downloadURL = ref.getDownloadURL();
            downloadURL.subscribe((url: any) => {
              this.afs
                .collection('Room')
                .doc(this.uid)
                .update({
                  Images: firebase.firestore.FieldValue.arrayUnion(url),
                });
              console.log('Image uploaded successfully:', url);
              alert('Image uploaded successfully!');
            });
          })
        )
        .subscribe();
    }
    const modalInstance = await this.m.create({
      component: Modal9Component,
      componentProps: {
        uid: this.uid,
      },
      backdropDismiss: false,
    });
    modalInstance.present();
  }
}
