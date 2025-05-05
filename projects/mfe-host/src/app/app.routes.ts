import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('mfeAuth/AuthModule').then((m) => m.AuthModule),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('mfeAuth/AuthLogin').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('mfeAuth/AuthRegister').then((m) => m.RegisterComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
