/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';

/* Guards */
import * as dashboardGuards from './guards';
import { AuthGuard } from '@modules/auth/guards';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StaticComponent } from './containers';
import { AskAppointmentComponent } from './containers/ask-appointment/ask-appointment.component';
import { UserInfoComponent } from './containers/user-info/user-info.component';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        data: {
            title: 'Clinica Saibene',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.LightComponent,
    },
    {
        path:"ask-appointment",
        canActivate:[AuthGuard],
        component: AskAppointmentComponent
    },
    {
        path:"user",
        canActivate:[AuthGuard],
        component: UserInfoComponent
    }
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
