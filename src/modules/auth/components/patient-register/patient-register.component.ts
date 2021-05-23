import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'sb-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss']
})
export class PatientRegisterComponent implements OnInit {

    public fg: FormGroup;
    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
    public disableButton: boolean = false;
    
    constructor(private fb: FormBuilder, private router: Router,
        public authService: AuthService, public userService: UserService,
        private spinnerSercie: NgxSpinnerService) {}
    ngOnInit() {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'birthDate': ['', [Validators.required]],
            'dni': ['', [Validators.required]],
            'os': ['', [Validators.required, Validators.maxLength(180)]],
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'type': [''],
            'specialities': [''],
        });
    }

    public onSubmit(form: FormGroup): void {
        this.needValidate.next(true);
        if(form.valid) {
            this.spinnerSercie.show();
            this.disableButton = true;
            let newUser = new User();
            newUser.firstName = this.fg.controls["firstName"].value;
            newUser.lastName = this.fg.controls["lastName"].value;
            newUser.birthDate = this.fg.controls["birthDate"].value;
            newUser.email = this.fg.controls["email"].value;
            newUser.dni = this.fg.controls["dni"].value;
            newUser.os = this.fg.controls["os"].value;
            newUser.type = "default";//this.fg.controls["type"].value;
            newUser.specialities = null;//this.fg.controls["specialities"].value;
            newUser.deleted = false;
            this.authService.signUp(newUser, this.fg.controls["password"].value).then((result) => {
                this.userService.create(newUser).then(response => {
                    console.log(response)
                    this.spinnerSercie.hide();
                    this.router.navigate(['auth', 'login']);
                }).catch((error) => {
                    this.disableButton = false;
                    console.log("error al registrarse");
                    console.error(error);
                    this.spinnerSercie.hide();
                });
            });
        }
    }

}
