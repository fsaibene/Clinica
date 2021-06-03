import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sb-specialist-avail-range',
  templateUrl: './specialist-avail-range.component.html',
  styleUrls: ['./specialist-avail-range.component.scss']
})
export class SpecialistAvailRangeComponent implements OnInit {
    @Input() user: BehaviorSubject<User>;
    @Input() spec: Speciality = null;

    public manianaChecked: boolean;
    public tardeChecked: boolean;

    constructor(private userService: UserService) { }

    private fillSelectedDays(ranges: string[]) {
        this.manianaChecked = ranges.includes("9-13");
        this.tardeChecked = ranges.includes("14-18");
    }

    public ngOnInit(): void {
        if(this.spec && this.spec.ranges) {
            this.fillSelectedDays(this.spec.ranges);
        }
    }

    private getRangesString(): string[] {
        let response = new Array<string>();
        if(this.manianaChecked) {
            response.push("9-13");
        }
        if(this.tardeChecked) {
            response.push("14-18");
        }
        return response;
    }

    public changeStatus(event: any): void{
        if(this.user.value){
            this.userService.setSpecialityRanges(this.user.value.dni, this.spec, this.getRangesString());
        }
    }
}
