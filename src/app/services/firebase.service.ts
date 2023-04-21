// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionRoom = 'Room';
  collectionTenant = 'Tenant';
  collectionOwner = 'Owner';
  rooms: any = new BehaviorSubject([]);
  tenants: any = new BehaviorSubject([]);
  owners: any = new BehaviorSubject([]);

  constructor(private firestore: AngularFirestore) {}

  create_room(record: any) {
    console.log(record);

    return this.firestore.collection(this.collectionRoom).add(record);
  }

  create_tenant(record: any) {
    console.log(record);

    return this.firestore.collection(this.collectionTenant).add(record);
  }

  create_owner(record: any) {
    console.log(record);

    return this.firestore.collection(this.collectionOwner).add(record);
  }

  read_room(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionRoom)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const roomList = a.map((e) => {
            const localData: any = e.payload.doc.data();
            return {
              id: e.payload.doc.id,
              isEdit: false,
              Name: localData.Name,
              Price: localData.Price,
              Address: localData.Address,
              NumBedSpace: localData.NumBedSpace,
              Detail: localData.Detail,
              BedSpaces: localData.BedSpaces,
              Img: localData.Img,
            };
          });
          return roomList;
        }),
        tap((a) => {
          this.rooms.next(a);
        })
      );
  }

  read_tenant(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionTenant)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const tenantList = a.map((e) => {
            const localData: any = e.payload.doc.data();
            return {
              id: e.payload.doc.id,
              isEdit: false,
              FName: localData.FName,
              LName: localData.LName,
              Age: localData.Age,
              Address: localData.Address,
            };
          });
          return tenantList;
        }),
        tap((a) => {
          this.tenants.next(a);
        })
      );
  }

  read_owner(): Observable<any[]> {
    return this.firestore
      .collection(this.collectionOwner)
      .snapshotChanges()
      .pipe(
        map((a) => {
          const ownerList = a.map((e) => {
            const localData: any = e.payload.doc.data();
            return {
              id: e.payload.doc.id,
              isEdit: false,
              FName: localData.FName,
              LName: localData.LName,
              Age: localData.Age,
              Address: localData.Address,
              Email: localData.Email,
              isPermited: localData.isPermited,
            };
          });
          return ownerList;
        }),
        tap((a) => {
          this.owners.next(a);
        })
      );
  }

  update_room(recordID: any, record: any) {
    this.firestore.doc(this.collectionRoom + '/' + recordID).update(record);
  }

  update_owner(ownerID: any, record: any) {
    this.firestore.doc(this.collectionOwner + '/' + ownerID).update(record);
  }

  delete_room(record_id: any) {
    this.firestore.doc(this.collectionRoom + '/' + record_id).delete();
  }

  delete_owner(record_id: any) {
    this.firestore.doc(this.collectionOwner + '/' + record_id).delete();
  }

  getRoom(room: any) {
    return this.rooms.value.find((a: any) => a.id == room);
  }

}
