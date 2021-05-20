import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    public password: string = "123456789";
    public email: string = "test@test.com";
  
    constructor(public auth: AuthService, public router: Router) { }
  
    ngOnInit(): void {
  
    }
    
    public login(): void {
      this.auth.login(this.email, this.password);
    }
  
}
