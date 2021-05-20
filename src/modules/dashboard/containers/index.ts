import { WelcomeComponent } from '../components/welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LightComponent } from './light/light.component';
import { StaticComponent } from './static/static.component';

export const containers = [DashboardComponent, StaticComponent, LightComponent, WelcomeComponent];

export * from './dashboard/dashboard.component';
export * from './static/static.component';
export * from './light/light.component';
