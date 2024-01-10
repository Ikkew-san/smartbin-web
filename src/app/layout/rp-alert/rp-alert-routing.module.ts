import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RpAlertComponent } from './rp-alert.component';

const routes: Routes = [{ path: "", component: RpAlertComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RpAlertRoutingModule { }
