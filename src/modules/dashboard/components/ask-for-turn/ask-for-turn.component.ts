import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserService } from '@modules/auth/services';
import { FirebaseStorageService } from '@modules/auth/services/firebase-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'sb-ask-for-turn',
  templateUrl: './ask-for-turn.component.html',
  styleUrls: ['./ask-for-turn.component.scss']
})
export class AskForTurnComponent implements OnInit {
    @Input() userType: string = "default";
    public fg: FormGroup;
    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
    public disableButton: boolean = false;

    public searchBoxSpec: string;
    
    constructor(private fb: FormBuilder, private router: Router,
        private firebaseStorage: FirebaseStorageService,
        public authService: AuthService, public userService: UserService,
        private spinnerSercie: NgxSpinnerService) {
    }
    ngOnInit(): void {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'speciality': ['', [Validators.required]],
        });
    }
    public selectSpec(spec: any) {
        console.log(spec.specialities);
    }
}
