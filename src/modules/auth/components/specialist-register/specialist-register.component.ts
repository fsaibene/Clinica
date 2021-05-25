import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SPECIALITIES } from '@app/specialities';
import { User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { AutocompleteComponent } from 'angular-ng-autocomplete'

@Component({
  selector: 'sb-specialist-register',
  templateUrl: './specialist-register.component.html',
  styleUrls: ['./specialist-register.component.scss']
})
export class SpecialistRegisterComponent implements OnInit {
    public fg: FormGroup;
    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
    public disableButton: boolean = false;
    @Output() onBack: EventEmitter<any> = new EventEmitter<any>()
    public searchBoxSpec: string;
    @ViewChild('auto') auto: AutocompleteComponent;

    constructor(private fb: FormBuilder, private router: Router,
        public authService: AuthService, public userService: UserService,
        private spinnerSercie: NgxSpinnerService) {}

    ngOnInit() {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'birthDate': ['', [Validators.required]],
            'dni': ['', [Validators.required]],
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'type': ['specialist'],
            'specialities': [[]],
        });
    }

    public keyword = 'specialities';
    public data = SPECIALITIES;
    
    public addCustomSpec() {
        let control = this.fg.controls["specialities"];
        control.value.push(this.searchBoxSpec);
        this.auto.clear();
        this.auto.close();
    }
    
    public deleteSpec(item: string) {
        let control = this.fg.controls["specialities"];
        if(control) {
            let list = this.removeElementFromArray(control.value, item);
            control.setValue(list);
        }
    }

    private removeElementFromArray(array: Array<string>, element: string) {
        array.forEach((value,index)=>{
            if(value==element) array.splice(index,1);
        });
        return array;
    }
    
    public selectEvent(item: any) {
        console.log(item)
        let control = this.fg.controls["specialities"];
        let oldValue = control.value;
        if(oldValue){
            oldValue.push(item.specialities);
            control.setValue(oldValue);
        } else {
            let newValue = [item.specialities]
            control.setValue(newValue);
        }
      // do something with selected item
    }
  
    onChangeSearch(val: string) {
        this.searchBoxSpec = val;
      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }
    
    onFocused(e: any){
        console.log(e)
      // do something when input is focused
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

    public onBackPressed(): void {
        this.onBack.emit();
    }
}
