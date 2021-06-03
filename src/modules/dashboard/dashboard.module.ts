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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SelectAppointmentDateComponent } from './components/select-appointment-date/select-appointment-date.component';
import { SpecialitiesComponent } from './components/specialities/specialities.component';
import { UserComponent } from './components/user/user.component';
import { UserInfoComponent } from './containers/user-info/user-info.component';
import { SpecialistComponent } from './components/user/specialist/specialist.component';
import { PatientComponent } from './components/user/patient/patient.component';
import { AdminComponent } from './components/user/admin/admin.component';
import { SpecialistHoursComponent } from './components/user/specialist-hours/specialist-hours.component';
import { SelectionComponent } from './components/user/specialist-hours/selection/selection.component';
import { SpecialistAvailDaysComponent } from './components/user/specialist-avail-days/specialist-avail-days.component';
import { SpecialistAvailRangeComponent } from './components/user/specialist-avail-range/specialist-avail-range.component';

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
        AutocompleteLibModule
    ],
    providers: [...dashboardServices.services, ...dashboardGuards.guards],
    declarations: [...dashboardContainers.containers, ...dashboardComponents.components, WelcomeComponent, AskAppointmentComponent, AppointmentHistoryComponent, UpcomingAppointmentsComponent, AskForTurnComponent, SelectAppointmentDateComponent, SpecialitiesComponent, UserComponent, UserInfoComponent, SpecialistComponent, PatientComponent, AdminComponent, SpecialistHoursComponent, SelectionComponent, SpecialistAvailDaysComponent, SpecialistAvailRangeComponent],
    exports: [...dashboardContainers.containers, ...dashboardComponents.components],
})
export class DashboardModule {}
