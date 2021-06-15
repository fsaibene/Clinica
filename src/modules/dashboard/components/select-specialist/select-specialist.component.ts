import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Speciality, User } from '@modules/auth/models';
import { UserService } from '@modules/auth/services';

@Component({
  selector: 'sb-select-specialist',
  templateUrl: './select-specialist.component.html',
  styleUrls: ['./select-specialist.component.scss']
})
export class SelectSpecialistComponent implements OnInit {
    
    private _spec: Speciality;
    
    @Input() set spec(value: Speciality) {
    
       this._spec = value;
       this.refreshList(this._spec);
    }
    
    get categoryId(): Speciality {
    
        return this._spec;
    
    }
    @Output() specialistSelected: EventEmitter<any> = new EventEmitter<any>();
    public specialistList: Array<User> = new Array<User>();
    constructor(private userService: UserService) {

     }

     private refreshList(_spec: Speciality) {
         this.specialistList = [];
        if(_spec) {
            this.userService.getAll().ref
            .where("type", "==", "specialist")
            .where("specialities", "array-contains", _spec.name)
            .get().then(res => {
                res.docs.forEach(specialist => {
                    this.specialistList.push(specialist.data());
                })
            });
        }
    }

    public ngOnInit(): void {

    }

    public onSelectSpecialist() {
        this.specialistSelected.emit(this.spec);
    }
}
