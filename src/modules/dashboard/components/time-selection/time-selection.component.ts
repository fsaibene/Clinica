import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'sb-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.scss']
})
export class TimeSelectionComponent implements OnInit {
    
    @Input() specialist: any;
    @Input() selectedSpec: any;

    public availDays: Array<any> = new Array<any>();
    constructor(private userService: UserService) { }

    ngOnInit(): void {
        if(this.specialist) {
            this.userService.getSpecialities(this.specialist.dni).pipe(take(1)).subscribe(res => {
                let hasSpecialities = res.docs.length > 0;
                if(hasSpecialities) {
                    res.docs.forEach(doc => {
                        let data = doc.data();
                        if(data.name == this.selectedSpec.name)
                        {
                            console.log(data);
                        }
                    })
                }
            })
        }

    }

}
