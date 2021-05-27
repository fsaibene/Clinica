/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';
import { ChartsModule } from '@modules/charts/charts.module';
import { TablesModule } from '@modules/tables/tables.module';

/* Components */
import * as dashboardComponents from './components';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';

/* Services */
import * as dashboardServices from './services';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AskAppointmentComponent } from './containers/ask-appointment/ask-appointment.component';
import { AppointmentHistoryComponent } from './containers/appointment-history/appointment-history.component';
import { UpcomingAppointmentsComponent } from './containers/upcoming-appointments/upcoming-appointments.component';
import { AskForTurnComponent } from './components/ask-for-turn/ask-for-turn.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        AppCommonModule,
        NavigationModule,
        ChartsModule,
        TablesModule,
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components, WelcomeComponent, AskAppointmentComponent, AppointmentHistoryComponent, UpcomingAppointmentsComponent, AskForTurnComponent],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}
