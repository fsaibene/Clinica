import { Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
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
    foto1Url: any;
    constructor(private authService: AuthService, private storage: FirebaseStorageService) {
     }

    ngOnInit(): void {
        let user = this.authService.getUserFromLS();
        let userObj = JSON.parse(user);
        this.currentUser.next(userObj) ;
        this.getUrlPhoto1();
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
