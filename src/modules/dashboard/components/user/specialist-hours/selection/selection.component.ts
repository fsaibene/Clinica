import { Component, Input, OnInit } from '@angular/core';
import { Speciality } from '@modules/auth/models';
import { AuthService, UserService } from '@modules/auth/services';

@Component({
  selector: 'sb-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {
    @Input() duration: string;
    @Input() userDni: string;
    @Input() spec: Speciality;
    
    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit(): void {
    }

    public onDurationSelect(){
        // this.authService.userDataSubject.
    }
}
