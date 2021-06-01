import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-specialist-avail-days',
  templateUrl: './specialist-avail-days.component.html',
  styleUrls: ['./specialist-avail-days.component.scss']
})
export class SpecialistAvailDaysComponent implements OnInit {
    @Input() user: BehaviorSubject<User>;
    @Input() spec: Speciality = null;
    @Input() days: string = null;
    constructor() { }

    ngOnInit(): void {
    }

}
