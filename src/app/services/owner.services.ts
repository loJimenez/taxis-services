import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Owner } from '../model/owner.model';

@Injectable()
export class OwnerService {
  ownersColection: AngularFirestoreCollection<Owner>;
  clienteDoc: AngularFirestoreDocument<Owner>;
  owners: Observable<Owner[]>;
  owner: Observable<Owner> | any;

  constructor(private db: AngularFirestore) {
    this.ownersColection = db.collection('owner', (ref) =>
      ref.orderBy('apellido', 'asc')
    );
  }

  getOwners(): Observable<Owner[]> {
    //Obetner los dueños de los taxis
    this.owners = this.ownersColection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const dates = action.payload.doc.data() as Owner;
          dates.id = action.payload.doc.id;
          return dates;
        });
      })
    );
    return this.owners;
  }

  addOwner(owner: Owner) {
    this.ownersColection.add(owner);
  }

  getOwner(id: string) {
    this.clienteDoc = this.db.doc<Owner>(`owner/${id}`);
    this.owner = this.clienteDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const dates = action.payload.data() as Owner;
          dates.id = action.payload.id;
          return dates;
        }
      })
    );
    return this.owner;
  }
  editOwner(owner: Owner){
    this.clienteDoc = this.db.doc(`owner/${owner.id}`);
    this.clienteDoc.update(owner);
  }

  deleteOwner(owner: Owner){
    this.clienteDoc = this.db.doc(`owner/${owner.id}`);
    this.clienteDoc.delete();
  }
}
