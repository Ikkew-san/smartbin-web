import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartbinRoutingModule } from './smartbin-routing.module';
import { SmartbinComponent } from './smartbin.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QRCodeModule } from 'angularx-qrcode';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

@NgModule({
  declarations: [SmartbinComponent],
  imports: [
    CommonModule,
    SmartbinRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    QRCodeModule,
    ConfirmationPopoverModule.forRoot()  ]
})
export class SmartbinModule { }
