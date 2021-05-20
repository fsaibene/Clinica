import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFirebaseErrors } from '@modules/auth/auth-errors';
import { AuthService } from '@modules/auth/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    public password: string = "123456789";
    public email: string = "test@test.com";
    public customError: string;
    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
  
    constructor(public auth: AuthService, public router: Router) { }
  
    ngOnInit(): void {
  
    }
    
    public login(): void {
        this.auth.login(this.email, this.password, (error) => {
            this.needValidate.next(true);
            this.customError = AuthFirebaseErrors[error.code];
        });
    }
  
}
