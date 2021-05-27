import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { UserData, UserLogged } from 'classes/message';
import firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    userData: any; // Save logged in user data
    public loggedUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public localStorageUser : string = "";
    constructor(
      public afs: AngularFirestore,   // Inject Firestore service
      public afAuth: AngularFireAuth, // Inject Firebase auth service
      public router: Router,
      public userService: UserService,
      public spinnerService: NgxSpinnerService,
      public ngZone: NgZone // NgZone service to remove outside scope warning
    ) {    
      
      this.afAuth.authState.subscribe(user => {
          if (user) {
              this.userData = user;
              localStorage.setItem('user', JSON.stringify(this.userData));
          } else {
              localStorage.setItem('user', "");
          }
          let storagedUser = localStorage.getItem('user');    
      })
    }
  
    // Sign in with email/password
      public async login(email: string, password: string, assignError: (error: any) => void): Promise<void> {
          try {
            this.spinnerService.show();
            this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
                if(result.user?.email && result.user?.emailVerified || this.isMockUser(result.user)){
                    this.setUserData(result.user);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    this.router.navigate(['dashboard']);
                    let user = new UserLogged();
                    user.userLogged = email;
                    user.date = Date.now();
                    this.loggedUser.next(email);
                } else {
                    window.alert("Debe verificar su correo, revise su casilla de mail");
                }
                
                this.spinnerService.hide();
            }).catch(error => {
                if(assignError){
                    assignError(error);
                }
                this.spinnerService.hide();
            });
          } catch (error) {
              window.alert(error.message);
          }
    }

    private isMockUser(user: firebase.User): boolean {
        return user.email == "admin@clinica.com" || user.email == "paciente1@clinica.com" || user.email == "paciente2@clinica.com" || user.email == "especialista1@clinica.com" || user.email == "especialista2@clinica.com";
    }
  
    // Sign up with email/password
    public async signUp(user: User, password: string) {
      try {
        const result = await this.afAuth.createUserWithEmailAndPassword(user.email, password);
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.sendVerificationMail();
        this.setUserData(result.user);
        this.router.navigate(['dashboard']);
        this.loggedUser.next(user.email);
      } catch (error) {
        window.alert(error.message);
      }
    }
  
    // Send email verfificaiton when new user sign up
    public async sendVerificationMail() {
      return this.afAuth.currentUser.then(u => {
        if(u) {
          u.sendEmailVerification()
        }
      })
      .then(() => {
        this.router.navigate(['auth', 'login']);
      })
    }
  
    // Reset Forggot password
    public async forgotPassword(passwordResetEmail: any) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
      let usr = localStorage.getItem('user');
      if(usr) {
        let userObj = JSON.parse(usr);
        this.loggedUser.next(userObj.email);
        return userObj && userObj.email;
      }
      return false;
    }
    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    public setUserData(user: any) {
    //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.dni}`);
    //   const userData: User = new User();
    //   userData.dni = user.dni;
    //   userData.email = user.email;
    //   this.loggedUser.next(user.email);
    //   return userRef.set(userData, {
    //     merge: true
    //   })
    }
  
    // Sign out 
    public async signOut() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['auth', 'login']);
        this.userData = null;
        this.loggedUser.next("");
      })
    }

    getAuth$(): Observable<{}> {
        return of({});
    }
}
