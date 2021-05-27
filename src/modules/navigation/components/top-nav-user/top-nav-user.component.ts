import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    constructor(public userService: UserService,public router: Router, public authService: AuthService) {}
    ngOnInit() {}

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
