import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { FirebaseStorageService, MEDIA_STORAGE_PATH } from '@modules/auth/services/firebase-storage.service';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    public specialities: Speciality[] = new Array<Speciality>();
    foto1Url: any;
    constructor(private authService: AuthService, private storage: FirebaseStorageService, private userService: UserService) {
     }

    ngOnInit(): void {
        let user = this.authService.getUserFromLS();
        let userObj = JSON.parse(user);
        this.currentUser.next(userObj) ;
        this.getUrlPhoto1();
        this.getSpecialities();
    }

    public getSpecialities() {
        if(this.currentUser) {
            this.userService.getSpecialities(this.currentUser.value.dni).pipe(take(1)).subscribe(res => {
                let data = res.docs;
                if(!data) {
                    this.setDefaultSpecialities();
                } else {
                    data.forEach(d =>  {
                        this.specialities.push(d.data() as Speciality);
                    })
                    
                }
                console.log(this.specialities);
            })

        }
    }
    setDefaultSpecialities() {
        if(this.currentUser.value.specialities) {
            this.currentUser.value.specialities.forEach(element => {
                let speciality = {} as Speciality;
                speciality.name = element.toString();
                speciality.duration = 15;
                speciality.days = "Lun Mar Mie Jue Vie";
                speciality.ranges = ["10-13", "15-18"];
                this.userService.addSpeciality(this.currentUser.value.dni, speciality);
                this.specialities.push(speciality);
            });
        }
        
    }

    public getUrlPhoto1() {
        return this.storage.referenciaCloudStorage(MEDIA_STORAGE_PATH + this.currentUser.value.email + "_1.jpg")
        .getDownloadURL()
        .pipe(take(1))
        .subscribe(response => {
            this.foto1Url = response;
        })
        ;
    }

}
