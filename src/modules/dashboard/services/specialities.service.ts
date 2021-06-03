import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { SpecialityDefinition } from '@modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {

    public dbpath: string = "/specialities";
    protected sdRefs: AngularFirestoreCollection<SpecialityDefinition>;
    
    constructor(private db: AngularFirestore) {
        this.sdRefs = db.collection(this.dbpath);
    }

    public getAll(): AngularFirestoreCollection<SpecialityDefinition> {
        return this.sdRefs;
    }

    public create(movie: SpecialityDefinition) {
        return this.sdRefs.doc(movie.id).set((Object.assign({}, movie)));
    }
    
    public delete(movie: SpecialityDefinition) {
        movie.deleted = true;
        return this.sdRefs.doc(movie.id).update(movie);
    }

    public update(movie: SpecialityDefinition) {
        return this.sdRefs.doc(movie.id).update(movie);
    }

    public addSpeciality(id:string, speciality: SpecialityDefinition) {
        return this.sdRefs.doc(id).collection("specialities").doc().set(speciality);
    }

    public getSpecialities(id:string) {
        return this.sdRefs.doc(id).collection("specialities").get();
    }

}