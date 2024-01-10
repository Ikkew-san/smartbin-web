import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RpExchangeRoutingModule } from './rp-exchange-routing.module';
import { RpExchangeComponent } from './rp-exchange.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RpExchangeComponent],
  imports: [
    CommonModule,
    RpExchangeRoutingModule,
    FormsModule
  ]
})
export class RpExchangeModule { }
