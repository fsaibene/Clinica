import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    @Input() control: AbstractControl;
    @Input() customError: string;
    @Input() needValidate$: Observable<boolean>;
    constructor() { }

    ngOnInit(): void {
    }
}
