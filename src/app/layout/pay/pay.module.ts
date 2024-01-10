import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [PayComponent],
  imports: [
    CommonModule,
    PayRoutingModule,
    ConfirmationPopoverModule.forRoot()
  ]
})
export class PayModule { }
