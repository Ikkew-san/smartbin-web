import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpCumulativeRoutingModule } from './rp-cumulative-routing.module';
import { RpCumulativeComponent } from './rp-cumulative.component';

@NgModule({
  declarations: [RpCumulativeComponent],
  imports: [
    CommonModule,
    RpCumulativeRoutingModule
  ]
})
export class RpCumulativeModule { }
