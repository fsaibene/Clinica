import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
    @Input() duration: number;
    @Input() user: BehaviorSubject<User>;
    @Input() spec: Speciality;
    
    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit(): void {
    }

    public changeStatus(duration: number, event: any){
        if(this.user.value){
            this.userService.setSpecialityDuration(this.user.value.dni, this.spec, duration);
        }
    }
}
