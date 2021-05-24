import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
    animations: [
        trigger(
          'enterAnimationBot', [
            transition(':enter', [
              style({transform: 'translateY(100%)', opacity: 0}),
              animate('0.5s', style({transform: 'translateY(0)', opacity: 1}))
            ])
          ]
        ),
        trigger(
            'enterAnimationTop', [
              transition(':enter', [
                style({transform: 'translateY(-100%)', opacity: 0}),
                animate('0.5s', style({transform: 'translateY(0)', opacity: 1}))
              ])
            ]
          )
      ]
})
export class RegisterComponent {
    public patientSelected: boolean = false;
    public specialistSelected: boolean = false;
    public selectRegister(selected: string) {
        this.patientSelected = selected == "patient";
        this.specialistSelected = selected == "specialist";
    }
    public reset(): void{
        this.patientSelected = false;
        this.specialistSelected = false;
    }
}
