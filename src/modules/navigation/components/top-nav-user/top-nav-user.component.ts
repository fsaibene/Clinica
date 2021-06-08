import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';
import { FirebaseStorageService, MEDIA_STORAGE_PATH } from '@modules/auth/services/firebase-storage.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit, AfterViewInit {
    public firstName: string;
    public lastName: string;
    public url: string = "";
    constructor(public storageService: FirebaseStorageService, public userService: UserService,public router: Router, public authService: AuthService) {}
    
    ngAfterViewInit(): void {
        this.initData();
    }
    ngOnInit() {
        this.initData();
    }

    public initData(): void {
        let user = this.authService.getUserFromLS();
        if(user){
            let userObj = JSON.parse(user);
            this.firstName = userObj.firstName;
            this.lastName = userObj.lastName;
            this.storageService.referenciaCloudStorage(MEDIA_STORAGE_PATH + userObj.email+ "_1.jpg")
            .getDownloadURL().pipe(take(1)).subscribe(url => {
                this.url = url;
            })
        }
    }

    public logout(): void {
        this.authService.signOut();
    }
    public goToLogin() {
        this.router.navigateByUrl("/auth/login");
    }
    public goToRegister(){
        this.router.navigateByUrl("/auth/register");
    }
    public goToUserSettings() {
        this.router.navigateByUrl("/dashboard/user");
    }
}
