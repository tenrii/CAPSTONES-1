import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },

  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then((m) => m.RegistrationPageModule
      ),
  },

  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then((m) => m.VerifyEmailPageModule
      ),
  },

  {
    path: 'login',
    loadChildren: () => import ('./login/login.module').then((m) => m.LoginPageModule),
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },

  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then(
        (m) => m.PasswordResetPageModule
      ),
  },

  {
    path: 'test',
    loadChildren: () =>
      import('./test/test.module').then((m) => m.TestPageModule),
  },

  {
    path: 'room',
    loadChildren: () =>
      import('./room/room.module').then((m) => m.RoomPageModule),
  },

  {
    path: 'room/:id',
    loadChildren: () =>
      import('./room/room.module').then((m) => m.RoomPageModule),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'owner-panel',
    loadChildren: () => import('./owner-panel/owner-panel.module').then( m => m.OwnerPanelPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'dashboard2',
    loadChildren: () => import('./dashboard2/dashboard2.module').then( m => m.Dashboard2PageModule)
  },
  {
    path: 'verify-email2',
    loadChildren: () => import('./verify-email2/verify-email2.module').then( m => m.VerifyEmail2PageModule)
  },
  {
    path: 'ex',
    loadChildren: () => import('./ex/ex.module').then( m => m.ExPageModule)
  },
  {
    path: 'ex2',
    loadChildren: () => import('./ex2/ex2.module').then( m => m.Ex2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
