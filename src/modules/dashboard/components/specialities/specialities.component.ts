import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SPECIALITIES } from '@app/specialities';

@Component({
  selector: 'sb-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.scss']
})
export class SpecialitiesComponent implements OnInit {
    public selectedSpec: string;
    public searchBoxSpec: string;
    public keyword = 'specialities';
    public data = SPECIALITIES;
    @Output() onSelectSpec: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void {
    }

    public selectEvent(item: any) {
      this.selectedSpec = item;
      this.onSelectSpec.emit(item);
    }

    onChangeSearch(val: string) {
        this.searchBoxSpec = val;
    }

    onFocused(e: any){
        console.log(e)
    }
}
