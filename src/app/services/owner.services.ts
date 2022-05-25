import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";
import { Owner } from "../model/owner.model";

@Injectable()
export class OwnerService{
    ownersColection: AngularFirestoreCollection<Owner>;
    clienteDoc: AngularFirestoreDocument<Owner>;
    owners: Observable<Owner[]>;
    owner: Observable<Owner>;

    constructor(private db: AngularFirestore){
        this.ownersColection = db.collection('owner', ref => ref.orderBy('apellido', 'asc'));
    }

    getOwners(): Observable<Owner[]>{
        //Obetner los dueños de los taxis
        this.owners = this.ownersColection.snapshotChanges().pipe(
            map( changes => {
                return changes.map( action => {
                    const dates = action.payload.doc.data() as Owner;
                    dates.id = action.payload.doc.id;
                    return dates;
                })
            })
        );
        return this.owners;
    }

}