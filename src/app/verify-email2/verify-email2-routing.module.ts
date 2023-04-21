import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyEmail2Page } from './verify-email2.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyEmail2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyEmail2PageRoutingModule {}
