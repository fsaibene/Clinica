import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { FirebaseStorageService, MEDIA_STORAGE_PATH } from '@modules/auth/services/firebase-storage.service';
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

    public foto1Data: FormData = new FormData();
    public foto2Data: FormData = new FormData();
    @Output() onBack: EventEmitter<any> = new EventEmitter<any>();

    constructor(private fb: FormBuilder, private router: Router,
        private firebaseStorage: FirebaseStorageService,
        public authService: AuthService, public userService: UserService,
        private spinnerSercie: NgxSpinnerService) {}
    ngOnInit() {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'birthDate': ['', [Validators.required]],
            'dni': ['', [Validators.required]],
            'foto1': [''],
            'foto2': [''],
            'os': ['', [Validators.required, Validators.maxLength(180)]],
            'email': ['', [Validators.required]],
            'password': ['', [Validators.required]],
            'type': ['patient'],
            'specialities': [[]],
        });
    }

    private createUserFromControls(): User {
        let newUser = {} as User;
        newUser.firstName = this.fg.controls["firstName"].value;
        newUser.lastName = this.fg.controls["lastName"].value;
        newUser.birthDate = this.fg.controls["birthDate"].value;
        newUser.email = this.fg.controls["email"].value;
        newUser.dni = this.fg.controls["dni"].value;
        newUser.os = this.fg.controls["os"].value;
        newUser.type = "patient";//this.fg.controls["type"].value;
        newUser.specialities = null;//this.fg.controls["specialities"].value;
        newUser.deleted = false;
        return newUser;
    }

    public onSubmit(form: FormGroup): void {
        this.needValidate.next(true);
        if(form.valid) {
            this.spinnerSercie.show();
            this.disableButton = true;
            let newUser = this.createUserFromControls();
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

    private onSignUpSucceed() {
        this.uploadPhotos();
        this.spinnerSercie.hide();
        window.alert("Registro Exitoso! Se envió un mail a la casilla para verificar el usuario.")
        this.router.navigate(['auth', 'login']);
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


    public onBackPressed(): void {
        this.onBack.emit();
    }

}
