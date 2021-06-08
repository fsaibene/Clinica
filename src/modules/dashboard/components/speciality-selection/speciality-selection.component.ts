import { Component, Input, OnInit } from '@angular/core';
import { SpecialityDefinition } from '@modules/auth/models';

@Component({
  selector: 'sb-speciality-selection',
  templateUrl: './speciality-selection.component.html',
  styleUrls: ['./speciality-selection.component.scss']
})
export class SpecialitySelectionComponent implements OnInit {
    @Input() spec: SpecialityDefinition;
    constructor() { }

    ngOnInit(): void {
    }



    public getPath() {
        return "../../assets/specs/default.jpg";
    }

}
