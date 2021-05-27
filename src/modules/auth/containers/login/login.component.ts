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
    public password: string;
    public email: string;
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

    public fillLoginData(user: string) {
        let password = "123456";
        let mail = "";
        switch(user) {
            case "admin":
                mail = "admin@clinica.com";
                break;
            case "paciente1":
                mail = "paciente1@clinica.com";
                break;
            case "paciente2":
                mail = "paciente2@clinica.com";
                break;
            case "especialista1":
                mail = "especialista1@clinica.com";
                break;
            case "especialista2":
                mail = "especialista2@clinica.com";
                break;
        }
        this.email = mail;
        this.password = password;
    }
  
}
