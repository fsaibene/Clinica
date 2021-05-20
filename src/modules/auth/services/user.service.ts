import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { User } from '../models';

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
        return this.menssagesRef.doc(movie.id.toString()).set(({...movie}));
    }
    
    public delete(movie: User) {
        movie.deleted = true;
        return this.menssagesRef.doc(movie.id.toString()).update(movie);
    }
}
