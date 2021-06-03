import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SPECIALITIES } from '@app/specialities';
import { Speciality, SpecialityDefinition, User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AutocompleteComponent } from 'angular-ng-autocomplete'
import { FirebaseStorageService, MEDIA_STORAGE_PATH } from '@modules/auth/services/firebase-storage.service';
import { SpecialitiesService } from '@modules/dashboard/services/specialities.service';

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

    public foto1Data: FormData = new FormData();
    public foto2Data: FormData = new FormData();
    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    public searchBoxSpec: string;
    @ViewChild('auto') auto: AutocompleteComponent;

    constructor(private fb: FormBuilder, private router: Router,
        private firebaseStorage: FirebaseStorageService,
        public authService: AuthService, public userService: UserService,
        private spinnerSercie: NgxSpinnerService, private ss: SpecialitiesService) {
    }

    ngOnInit() {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'birthDate': ['', [Validators.required]],
            'dni': ['', [Validators.required]],
            'foto1': [''],
            'foto2': [''],
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'type': ['specialist'],
            'specialities': [[]],
        });
        this.ss.getAll().ref.get().then(res => {
            this.data = new Array<object>();
            res.docs.forEach(d => {
                let spec = d.data();
                this.data.push(spec);
            });
            // this.data = SPECIALITIES;
        });
    }

    public keyword = 'name';
    public data: Array<object>;
    
    public addCustomSpec() {
        let control = this.fg.controls["specialities"];
        control.value.push(this.searchBoxSpec);
        this.auto.clear();
        this.auto.close();
        let newSs = {} as SpecialityDefinition;
        newSs.name = this.searchBoxSpec;
        this.ss.create(newSs);
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

    private createUserFromControls(): User {
        let newUser = {} as User;
        newUser.firstName = this.fg.controls["firstName"].value;
        newUser.lastName = this.fg.controls["lastName"].value;
        newUser.birthDate = this.fg.controls["birthDate"].value;
        newUser.email = this.fg.controls["email"].value;
        newUser.dni = this.fg.controls["dni"].value;
        newUser.type = "specialist";
        newUser.specialities = this.fg.controls["specialities"].value;
        newUser.deleted = false;
        newUser.emailVerified = false;
        return newUser;
    }
    
    public selectEvent(item: any) {
        let control = this.fg.controls["specialities"];
        let oldValue = control.value;
        if(oldValue){
            oldValue.push(item.specialities);
            control.setValue(oldValue);
        } else {
            let newValue = [item.specialities]
            control.setValue(newValue);
        }
    }
  
    onChangeSearch(val: string) {
        this.searchBoxSpec = val;
    }
    
    onFocused(e: any){
        console.log(e)
    }

    public onSubmit(form: FormGroup): void {
        this.needValidate.next(true);
        if(form.valid) {
            this.spinnerSercie.show();
            this.disableButton = true;
            let newUser =  this.createUserFromControls(); 
            this.authService.signUp(newUser, this.fg.controls["password"].value).then((result) => {
                this.userService.create(newUser).then(response => {
                    this.onSignUpSucceed();
                }).catch((error) => {
                    this.disableButton = false;
                    console.log("error al registrarse");
                    console.error(error);
                    this.spinnerSercie.hide();
                });
            });
        }
    }

    private onSignUpSucceed() {
        let specControl = this.fg.controls["specialities"];
        let dni = this.fg.controls["dni"].value;

        if(specControl && specControl.value) {
            specControl.value.forEach((element: { toString: () => string; })=> {
                let speciality = {} as Speciality;
                speciality.name = element.toString();
                speciality.duration = 15;
                speciality.days = "L M M J V";
                speciality.ranges = ["10-13", "15-18"]
                this.userService.addSpeciality(dni.toString(), speciality);
            });
        }

        
        this.uploadPhotos();
        this.spinnerSercie.hide();
        window.alert("Registro Exitoso! Se envió un mail a la casilla para verificar el usuario.")
        this.router.navigate(['auth', 'login']);
    }
    
    private uploadPhotos(): void {
        this.uploadPhoto("1", this.foto1Data);
        this.uploadPhoto("2", this.foto2Data);
    }

    public uploadPhoto(photoNum: string, data: FormData) {
        let archivo = data.get('archivo') as File;
        if(archivo) {
            let email = this.fg.controls["email"].value;
            let extension = archivo.name.split(".").pop();
            let name = MEDIA_STORAGE_PATH  + email  + "_" + photoNum + extension;
            this.firebaseStorage.referenciaCloudStorage(name);
            this.firebaseStorage.tareaCloudStorage(name, archivo);
        }
    }

    public onBackPressed(): void {
        this.onBack.emit();
    }

    public cambioFoto1(event: any) {
        this.cambioArchivo(event, this.foto1Data);
    }

    public cambioFoto2(event: any) {
        this.cambioArchivo(event, this.foto2Data);
    }

    public cambioArchivo(event: any, data: FormData) {
        if (event.target.files.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                data.delete("archivo");
                data.append("archivo", event.target.files[i], event.target.files[i].name)
            }
        }
    }
}
