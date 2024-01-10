import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpPayRoutingModule } from './rp-pay-routing.module';
import { RpPayComponent } from './rp-pay.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RpPayComponent],
  imports: [
    CommonModule,
    RpPayRoutingModule,
    FormsModule
  ]
})
export class RpPayModule { }
