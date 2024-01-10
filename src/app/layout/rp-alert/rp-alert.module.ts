import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpAlertRoutingModule } from './rp-alert-routing.module';
import { RpAlertComponent } from './rp-alert.component';

@NgModule({
  declarations: [RpAlertComponent],
  imports: [
    CommonModule,
    RpAlertRoutingModule
  ]
})
export class RpAlertModule { }
