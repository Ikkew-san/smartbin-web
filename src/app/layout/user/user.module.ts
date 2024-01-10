import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from "@angular/forms";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { ImageCropperModule } from "ngx-image-cropper";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    ConfirmationPopoverModule.forRoot()
  ]
})
export class UserModule { }
