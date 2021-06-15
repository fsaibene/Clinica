import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialityDefinition } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { FirebaseStorageService } from '@modules/auth/services/firebase-storage.service';
import { SpecialitiesService } from '@modules/dashboard/services/specialities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'sb-ask-for-turn',
  templateUrl: './ask-for-turn.component.html',
  styleUrls: ['./ask-for-turn.component.scss'],
  animations: [
    trigger(
      'enterAnimationBot', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('0.5s', style({transform: 'translateY(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
        'leaveAnimationBot', [
          transition(':leave', [
            style({opacity: 1}),
            animate('0.5s', style({opacity: 0}))
          ])
        ]
      ),
    trigger(
        'enterAnimationTop', [
          transition(':enter', [
            style({transform: 'translateY(-100%)', opacity: 0}),
            animate('0.5s', style({transform: 'translateY(0)', opacity: 1}))
          ])
        ]
      )
  ]
})
export class AskForTurnComponent implements OnInit {
    @Input() userType: string = "default";
    public fg: FormGroup;
    public needValidate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public needValidate$: Observable<boolean> = this.needValidate.asObservable();
    public disableButton: boolean = false;

    public searchBoxSpec: string;
    public selectedSpec: any;
    public specialities: SpecialityDefinition[] = new Array<SpecialityDefinition>();

    constructor(private fb: FormBuilder, private router: Router,
        public authService: AuthService, public userService: UserService,
        public specService: SpecialitiesService,
        private spinnerSercie: NgxSpinnerService) {
    }
    ngOnInit(): void {
        this.fg =  this.fb.group({
            'firstName': ['', [Validators.required, Validators.maxLength(100)]],
            'lastName': ['', [Validators.required, Validators.maxLength(100)]],
            'speciality': ['', [Validators.required]],
        });
        this.spinnerSercie.show().then(() => {
            this.specService.getAll().ref.get().then(res => {
                res.docs.forEach(d => {
                    let spec = d.data();
                    this.specialities.push(spec);
                });
                this.spinnerSercie.hide();
            });
        })
        
    }
    public selectSpec(spec: any) {
        if(spec && spec.specialities) {
            this.selectedSpec = spec.specialist; 
        }
        console.log(spec.specialities);
    }

    public onSelectSpec($event: any) {
        this.selectedSpec = $event;
    }

    public reset(): void {
        this.selectedSpec = null;
    }
}
