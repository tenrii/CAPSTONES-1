import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExPage } from './ex.page';

const routes: Routes = [
  {
    path: '',
    component: ExPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExPageRoutingModule {}
