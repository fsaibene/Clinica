import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Speciality, User } from '../models';

const userSubject: ReplaySubject<User> = new ReplaySubject(1);

@Injectable()
export class UserService {

    set user(user: User) {
        userSubject.next(user);
    }

    get user$(): Observable<User> {
        return userSubject.asObservable();
    }
    public dbpath: string = "/users";
    protected menssagesRef: AngularFirestoreCollection<User>;
    
    constructor(private db: AngularFirestore) {
        this.menssagesRef = db.collection(this.dbpath);
    }

    public getAll(): AngularFirestoreCollection<User> {
        return this.menssagesRef;
    }

    public create(movie: User) {
        return this.menssagesRef.doc(movie.dni.toString()).set((Object.assign({}, movie)));
    }
    
    public delete(movie: User) {
        movie.deleted = true;
        return this.menssagesRef.doc(movie.dni.toString()).update(movie);
    }

    public update(movie: User) {
        return this.menssagesRef.doc(movie.dni.toString()).update(movie);
    }

    public addSpeciality(id:string, speciality: Speciality) {
        return this.menssagesRef.doc(id).collection("specialities").doc().set(speciality);
    }

    public getSpecialities(id:string) {
        return this.menssagesRef.doc(id).collection("specialities").get();
    }

    public setSpecialityDuration(id:string, speciality: Speciality, duration: number) {
        return this.menssagesRef.doc(id).collection("specialities").doc(speciality.id).update({ "duration": duration});
    }

    public setSpecialityDays(id:string, speciality: Speciality, days: string) {
        return this.menssagesRef.doc(id).collection("specialities").doc(speciality.id).update({ "days": days});
    }

    public setSpecialityRanges(id:string, speciality: Speciality, ranges: string[]) {
        return this.menssagesRef.doc(id).collection("specialities").doc(speciality.id).update({ "ranges": ranges});
    }
}
