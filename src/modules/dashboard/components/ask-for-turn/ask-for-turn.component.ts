import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sb-ask-for-turn',
  templateUrl: './ask-for-turn.component.html',
  styleUrls: ['./ask-for-turn.component.scss']
})
export class AskForTurnComponent implements OnInit {
    @Input() userType: string = "default";
    constructor() { }

    ngOnInit(): void {
        
    }

}
