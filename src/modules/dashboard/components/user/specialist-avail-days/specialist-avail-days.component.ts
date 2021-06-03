import { Component, Input, OnInit } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';
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

    public lunChecked: boolean;
    public marChecked: boolean;
    public mierChecked: boolean;
    public jueChecked: boolean;
    public vieChecked: boolean;
    public sabChecked: boolean;

    constructor(private userService: UserService) { }

    private fillSelectedDays(days: string) {
        let arr = days.split(" ");
        this.lunChecked = arr.includes("Lun");
        this.marChecked = arr.includes("Mar");
        this.mierChecked = arr.includes("Mie");
        this.jueChecked = arr.includes("Jue");
        this.vieChecked = arr.includes("Vie");
        this.sabChecked = arr.includes("Sab");
    }

    public ngOnInit(): void {
        if(this.spec && this.spec.days) {
            this.fillSelectedDays(this.spec.days);
        }
    }
    
    private getDaysString(): string {
        let response = "";
        response = this.lunChecked ? "Lun " : "";  
        response = response += this.marChecked ? "Mar " : "";  
        response = response += this.mierChecked ? "Mie " : "";  
        response = response += this.jueChecked ? "Jue " : "";  
        response = response += this.vieChecked ? "Vie " : "";  
        response = response += this.sabChecked ? "Sab" : "";  
        return response;
    }

    public changeStatus(event: any): void{
        if(this.user.value){
            this.userService.setSpecialityDays(this.user.value.dni, this.spec, this.getDaysString());
        }
    }
}
