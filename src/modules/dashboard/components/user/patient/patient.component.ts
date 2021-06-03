import { Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
    @Input() user: BehaviorSubject<User> = null;
    @Input() foto1Url: string = null;
    public currentUser: User;
    constructor() { }

    ngOnInit(): void {
        this.currentUser = this.user.value; 
    }
}
