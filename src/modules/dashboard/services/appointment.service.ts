import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Appointment, SpecialityDefinition } from '@modules/auth/models';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    public dbpath: string = "/appointments";
    protected sdRefs: AngularFirestoreCollection<Appointment>;
    
    constructor(private db: AngularFirestore) {
        this.sdRefs = db.collection(this.dbpath);
    }

    public getAll(): AngularFirestoreCollection<Appointment> {
        return this.sdRefs;
    }

    public create(movie: Appointment) {
        return this.sdRefs.doc(movie.id).set((Object.assign({}, movie)));
    }
    
    public delete(movie: Appointment) {
        movie.deleted = true;
        return this.sdRefs.doc(movie.id).update(movie);
    }

    public update(movie: Appointment) {
        return this.sdRefs.doc(movie.id).update(movie);
    }

    public addSpeciality(id:string, speciality: Appointment) {
        // return this.sdRefs.doc(id).collection("specialities").doc().set(speciality);
    }

    public getSpecialities(id:string) {
        // return this.sdRefs.doc(id).collection("specialities").get();
    }
}
