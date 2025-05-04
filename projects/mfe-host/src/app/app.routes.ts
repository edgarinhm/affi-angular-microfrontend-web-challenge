import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('mfeAuth/AuthComponent').then((c) => c.AppComponent),
  },
];
