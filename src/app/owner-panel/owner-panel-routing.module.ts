import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnerPanelPage } from './owner-panel.page';

const routes: Routes = [
  {
    path: '',
    component: OwnerPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnerPanelPageRoutingModule {}
