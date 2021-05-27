import { Component, Input, OnInit } from '@angular/core';
import { User } from '@modules/auth/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {
    @Input() user: BehaviorSubject<User> = null;
    @Input() foto1Url: string = null;
    public currentUser: User;
    constructor() { }

    ngOnInit(): void {
        this.currentUser = this.user.value; 
    }

}
