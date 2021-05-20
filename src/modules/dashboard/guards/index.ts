import { AuthGuard } from '@modules/auth/guards';
import { DashboardGuard } from './dashboard.guard';

export const guards = [DashboardGuard, AuthGuard];

export * from './dashboard.guard';
