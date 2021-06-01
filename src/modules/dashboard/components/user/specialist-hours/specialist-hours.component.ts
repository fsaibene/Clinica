import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-specialist-hours',
  templateUrl: './specialist-hours.component.html',
  styleUrls: ['./specialist-hours.component.scss']
})
export class SpecialistHoursComponent implements OnInit {
    @Input() currentUser: BehaviorSubject<User>;
    @Input() speciality: Speciality = null;
    @Input() dni: string;
    constructor() { }

    ngOnInit(): void {
    }

}
