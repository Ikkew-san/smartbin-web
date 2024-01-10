import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartbinComponent } from './smartbin.component';

const routes: Routes = [{ path: "", component: SmartbinComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmartbinRoutingModule { }
