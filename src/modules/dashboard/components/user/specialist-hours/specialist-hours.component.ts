import { Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';

@Component({
  selector: 'sb-specialist-hours',
  templateUrl: './specialist-hours.component.html',
  styleUrls: ['./specialist-hours.component.scss']
})
export class SpecialistHoursComponent implements OnInit {
    @Input() currentUser: User = null;
    @Input() speciality: string = null;
    constructor() { }

    ngOnInit(): void {
    }

}
