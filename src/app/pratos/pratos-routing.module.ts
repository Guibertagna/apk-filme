import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PratosPage } from './pratos.page';

const routes: Routes = [
  {
    path: '',
    component: PratosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PratosPageRoutingModule {}
